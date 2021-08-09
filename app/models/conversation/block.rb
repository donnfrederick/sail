class Conversation
  def self.block_all_as_teacher
    update_all(teacher_blocks: true)
  end

  def self.block_all_as_student
    update_all(student_blocks: true)
  end
end
