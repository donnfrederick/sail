ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    teachers = Teacher.includes(:teachers_conversations)
    students = Student.includes(:students_conversations)
    prev_students = students.where.not(created_at: Time.now.last_month..Time.now)
    prev_teachers = teachers.where.not(created_at: Time.now.last_month..Time.now)
    student_maidens = prev_students.where(conversations: {id: nil}).size
    student_torpors = prev_students.where.not(conversations: {created_at: Time.now.last_month..Time.now}).size
    teacher_maidens = prev_teachers.where(conversations: {id: nil}).size
    teacher_torpors = prev_teachers.where.not(conversations: {created_at: Time.now.last_month..Time.now}).size
    students_pluck = students.pluck(:country)
    conversations = Conversation.all
    issues = Issue.all

    columns do
      column do
        panel "Teachers(MAT)" do
          h1 "#{teachers.size}(#{mau(:teacher_id)})"
        end
        panel "Students(MAS)" do
          h1 "#{students.size}(#{mau(:student_id)})"
        end
        panel "Conversations(Current)" do
          h1 "#{conversations.size}(#{conversations.where(start_at: Time.now.ago(30.minutes)..Time.now).size})"
        end
      end

      column do
        panel "Teacher Maidens(%)" do
          h1 "#{teacher_maidens}(#{percent(teacher_maidens,teachers.size)}%)"
        end
        panel "Student Maidens(%)" do
          h1 "#{student_maidens}(#{percent(student_maidens,students.size)}%)"
        end
        panel "Vacant Conversation(Next Week)" do
          h1 "#{conversations.where(student_id: nil).where('start_at > ?', Time.now).size}(#{conversations.where(student_id: nil).where(start_at: Time.now..Time.now.next_week).size})"
        end
      end

      column do
        panel "Teacher Torpors(%)" do
          h1 "#{teacher_torpors}(#{percent(teacher_torpors,teachers.size)}%)"
        end
        panel "Student Torpors(%)" do
          h1 "#{student_torpors}(#{percent(student_torpors,students.size)}%)"
        end
        panel "Paid(Orgs)" do
          h1 "#{issues.where('expired_at > ?',Time.now).where(type: ['StripeIssue','PaypalIssue']).size}(#{issues.where('expired_at > ?',Time.now).where(type: ['OrganizationSectionIssue']).size})"
        end
      end
    end



        # panel "Vacant Conversations for Next week" do
        #   h1 "#{conversations.where(student_id: nil).where(start_at: Time.now..Time.now.next_week).size}"
        # end


    panel 'Free Reports' do
      render 'shared/free_report'
    end
    panel 'PDF from CSV' do
      render 'shared/pdf_import'
    end
    columns do
      column do
        panel 'Maidens And Torpors Reports' do
          render 'shared/maidens_and_torpors_report'
        end
      end
    end
  end
end
