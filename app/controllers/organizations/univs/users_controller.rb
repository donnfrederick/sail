module Organizations
  module Univs
    class UsersController < ::Organizations::Users::UsersController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Univs
      include ::Organizations::OrganizationSectionHelper

      add_flash_types :success, :info, :warning, :danger
      before_action :verify_student, only: [:show, :edit, :update, :destroy]
      before_action :the_dimension, :the_users_org_sections_in_section, :the_at_max_users, only: [:list]
      # before_action :to_new_invitation,                                                    only: [:new, :create]

      validates :delete do
        integer :user_id, required: true, description: "user ID"
      end

      # ユーザー一覧 (+ページネーション)
      def index
        @q = current_staff.organization.users.order(created_at: :DESC).where(type: 'Student').ransack(params[:q])
        @students = @q.result(distinct: true).page(params[:page]).per(50)
        respond_to do |format|
          format.html
          format.pdf do
            send_data generate_pdf(@students, params[:q][:created_at_range_beginning], params[:q][:created_at_range_end], params[:student][:id]).render,
            filename: "Report_#{params[:q][:created_at_range_beginning]}_#{params[:q][:created_at_range_end]}.pdf",
            type: "application/pdf"
          end
          format.json do
            render json: Student.find_by(encrypted_email: Student.encrypt_email(params[:email]))
          end
        end
      end

      def show
        @conversations = @student.conversations.order(start_at: :DESC).page(params[:page]).per(50)
      end

      def new
        @student = Student.new
      end

      def create
        @student = Student.find_or_initialize_by(encrypted_email: Student.encrypt_email(params[:student][:email]))
        if @student.organization_sections.exists?
          @error_message = ['this student already blongs to another section']
          render 'organizations/univs/users/new'
          return
        end

        entry_attributes

        if @student.save
          IssueCreateService.new(@student).create_organization_sections! if @student.issues.find_by(type: 'OrganizationSectionIssue').blank?
          redirect_to :organizations_univs_users, success: @message
        else
          @error_message = @student.errors.full_messages
          render 'organizations/univs/users/new'
        end
      end

      def edit
      end

      def update
        params[:student].delete(:password) if params[:student][:password].blank?
        @student.assign_attributes(student_params)

        if @student.save
          IssueCreateService.new(@student).create_organization_sections! if @student.issues.find_by(type: 'OrganizationSectionIssue').blank?
          redirect_to organizations_univs_user_path(@student), success: "#{@student.name_en} is a new student and successfully updated"
        else
          @error_message = @student.errors.full_messages
          render 'organizations/univs/users/edit'
        end

      end

      def destroy
        @student.organization_sections.destroy_all
        redirect_to :organizations_univs_users, success: "#{@student.name_en} has been successfully removed"
      end

      protected

      def find_role_user_by(conditions)
        Student.find_by(conditions)
      end

      def the_dimension(dimension_id = nil)
        @dimension = if dimension_id.present?
                       OrganizationSection.find_by(id: dimension_id)
                     else
                       OrganizationSection.find_by(id: params[:dimension_id])
                     end
        @current_section = @dimension

        redirect_to view_context.org_error_no_contract("section") if @current_section.blank?
      end

      def the_dimensions
        @dimensions = [current_staff.organization_section]
        @sections = @dimensions
      end

      def the_at_max_users
        @at_max_users = at_max_users_in?
      end

      def the_users_org_sections_in_section
        @users_org_sections_in_section ||= current_staff.organization_section.users
      end

      def at_max_users_in?
        @users_org_sections_in_section.count >= max_user_in_dimension
      end

      def to_new_invitation
        redirect_to view_context.org_invitation_new_path(@role_type)
      end

      private
      def student_params
        params[:student][:organization_section_ids] = [params[:student][:organization_section_ids]]
        attrs = Student.column_names.map { |m| m.to_sym }
        attrs.push(:email, :password, organization_section_ids: [])
        params.require(:student).permit(attrs)
      end

      def entry_attributes
        if @student.new_record?
          @student.assign_attributes(student_params)
          @message = "#{@student.name_en} is a new student and successfully registered to #{@student.organization_sections.first.name}"
        else
          @student.assign_attributes(organization_section_ids: [params[:student][:organization_section_ids]])
          @message = "#{@student.name_en} was already take part in sail and successfully registered to #{@student.organization_sections.first.name}"
        end
      end

      def verify_student
        @student = Student.find(params[:id])
        unless @student.organizations.first == current_staff.organization
          redirect_to :organizations_univs_users, warning: 'You are not authorized to access this student'
          return
        end
      end

      def available_seats
        current_staff.organization.name_kana.to_i + OrganizationSectionIssue.where(user: current_staff.organization.users.where(type: 'Student')).sum(:conversations)
      end

      def sample_data(headers)

        return data
      end

      def generate_pdf(students, beginning_day, end_day, stundets_id)
        file_name = "pdf_#{Time.new.strftime("%d%H%M")}.pdf"
        start_date = (beginning_day + " 00:00:00").in_time_zone
        end_date = (end_day + " 23:59:59").in_time_zone
        pdf = Prawn::Document.new({ page_size: 'A4', page_layout: :portrait, margin: 20}){
          font_families.update('standard' => { normal: "#{Rails.root}/assets/fonts/ipaexm.ttf", bold: "#{Rails.root}/assets/fonts/ipaexg.ttf"})
          font 'standard'
          headers = ["No", "ID", "お名前", "会話回数", "予約キャンセル", "会話時間", "合計会話回数", "合計会話時間"]
          client_name = "#{students.first.organizations.first.name_en}"
          report_title = '会話状況のレポート〜学習者の方々〜'

          #data = []#テーブルを作成する為、二次配列でお願いいたします。
          data = Array.new
          data << headers
          students.where(id: stundets_id).each.with_index(1) do |s,i|
            conversations_this_week = s.conversations.where(start_at: (start_date)..(end_date)).size
            cancelled_by_student = CancelledConversation.where(start_at: (start_date)..(end_date)).where(student_id: s.id).where(reason: 'student').size
            rows = [i, s.id, s.name_en, "#{conversations_this_week}回", "#{cancelled_by_student}回", "#{conversations_this_week * 25}分", "#{s.conversations.size}回", "#{s.conversations.size * 25}分"]
            data << rows
          end
          #header
          text_box "#{client_name}様", at: [50, 770], size:10#destination
          text_box report_title, at: [0, 730], size:12, :align => :center#subtitle
          text_box "対象期間：#{start_date.strftime("%m月%d日")}〜#{end_date.strftime("%m月%d日")}", at: [30, 700], size: 8#tarm
          image "#{Rails.root}/public/img/sail.png", at: [450, 730], width: 45
          #table
          bounding_box([30,690], :width=>490){table(data,
            :header => true,
            :column_widths => [20,70,100,60,60,60,60,60]
            ) do |t|
              t.columns(0..2).style :align => :center
              t.columns(3..7).style :align => :right
              #table-header
              t.rows(0).font_style = :bold
              t.rows(0).text_color = "ffffff"
              t.rows(0).style :align => :center, :background_color => "0000ff",height: 20
              #table-main
              0..data.length.times do |r|
                t.row(r).height=20
                t.row(r).style size: 7
              end
            end
          }
            #footer
            start_new_page if y <= 70
            footer_line = 50
            helte = '株式会社Helte'
            helte_adress = '千葉県柏市東上町 2-28 第一水戸屋ビル3F'
            helte_email = 'sales@helte-corp.com'
            text_box "#{helte}  #{helte_adress}  #{helte_email}", at: [75, footer_line], size: 8
            image "#{Rails.root}/public/img/helte.png", at:[425, footer_line + 10], width: 30
        }
        return pdf
      end
    end
  end
end
