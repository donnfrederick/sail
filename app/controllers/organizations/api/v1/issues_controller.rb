class Organizations::Api::V1::IssuesController < ::ApplicationController
  include ::Api::V1::Concerns::ErrorHandler
  include ::Organizations::Concerns::Authenticator
  include ::Organizations::OrganizationSectionHelper

  before_action :auth_with_session!

  def index
    @issue = OrganizationSectionIssue.find(params[:id])
    @seats = {lefts: available_seats, over: false}

    if @issue.conversations == 0
      seats_left? ? @issue.update(conversations: -1) : @seats.store('over', true)
    else
      @issue.update(conversations: 0)
    end

    @seats.store(:lefts, available_seats)
    render json: @seats
  end

  private
  def seats_left?
    @seats[:lefts] > 0
  end
end