require 'factory_bot'

Rails.application.config.active_job.queue_adapter = :inline

count = 3
teachers = []
device_teachers = []
students = []
section_students = []

User.reset_column_information
Organization.reset_column_information
OrganizationSection.reset_column_information
OrganizationStaff.reset_column_information
OrganizationDevice.reset_column_information

teachers += FactoryBot.create_list(
  :teacher,
  5,
  hobbies: Hobby.by_teacher.sample(3),
  purposes: Purpose.by_teacher.sample(3)
)

students += FactoryBot.create_list(
  :student,
  10,
  hobbies:  Hobby.by_student.sample(3),
  purposes: Purpose.by_student.sample(3)
)

#
# Organization.nursing_house?
#
org_nh = FactoryBot.create_list(:organization, count,
                                industry: Organization::INDUSTRY_NURSING_HOUSE
)
org_nh.each do |nh|
  1.upto count do |_j|
    section = FactoryBot.create(:organization_section, organization: nh)
    section_staffs = FactoryBot.create_list(
        :organization_staff,
        count,
        organization_section: section
        )

    section_staffs.each do |section_staff|
      device = FactoryBot.create(
          :organization_device,
          organization_staff: section_staff)

      1.upto 8 do |_i|
        device_teachers << FactoryBot.create(:teacher,
                                      organization_sections: [section],
                                      organization_device: device,
                                      hobbies: Hobby.by_teacher.sample(3),
                                      purposes: Purpose.by_teacher.sample(3)
        )
      end
      teachers += device_teachers

      puts "=========[NH]========="
      section_staffs.each do |section_staff|
        puts "Email: " + section_staff.email
        puts "Password: " + section_staff.password
      end
      puts "/===================="
    end
  end
end


#
# Organization.university?
#
org_univ = FactoryBot.create_list(:organization, count,
            industry: Organization::INDUSTRY_UNIVERSITY
           )
org_univ.each do |univ|
  1.upto count do |_j|
    section = FactoryBot.create(:organization_section, organization: univ)
    section_staff = FactoryBot.create(
        :organization_staff,
        organization_section: section
    )

    section_students += FactoryBot.create_list(:student,
                                               count * 4,
                                               organization_sections: [section],
                                               hobbies: Hobby.by_teacher.sample(3),
                                               purposes: Purpose.by_teacher.sample(3)
    )
    students += section_students

    puts "=========[Univ]========="
    puts "Email: #{section_staff.email}"
    puts "Password: #{section_staff.password}"
    puts "/===================="
  end
end


#
# Conversations between device teachers and any students
#
device_teachers.each do |device_teacher|
  1.upto 3 do |i|
    FactoryBot.create(
      :conversation,
      :skip_validate,
      status:   Conversation::STATUS_COMPLETED,
      start_at: i.days.ago,
      end_at:   i.days.ago + Conversation::DURATION,
      teacher: device_teacher,
      student: students.sample,
    )
  end
  1.upto 3 do |i|
    FactoryBot.create(
      :conversation,
      :skip_validate,
      status:   Conversation::STATUS_COMPLETED,
      start_at: i.days.since,
      end_at:   i.days.since + Conversation::DURATION,
      teacher: device_teacher,
      student: students.sample,
    )
  end
end


#
# Conversations between individual users
#
individual_teachers = teachers - device_teachers
individual_students = students - section_students

individual_students.each do |individual_student|
  1.upto 3 do |i|
    FactoryBot.create(
      :conversation,
      :skip_validate,
      status:   Conversation::STATUS_COMPLETED,
      start_at: i.days.ago,
      end_at:   i.days.ago + Conversation::DURATION,
      teacher: individual_teachers.sample,
      student: individual_student,
    )
  end
  1.upto 3 do |i|
    FactoryBot.create(
      :conversation,
      :skip_validate,
      status:   Conversation::STATUS_COMPLETED,
      start_at: i.days.since,
      end_at:   i.days.since + Conversation::DURATION,
      teacher: individual_teachers.sample,
      student: individual_student,
    )
  end
end


#
# Notifications
#
FactoryBot.create_list(:notification, 10, :skip_validate)
