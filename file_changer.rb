require 'byebug'

# def change_files(file)
#   if file.include?('students')
#     epi = file.gsub('students', 'international')
#     File.rename(file, epi)
#   elsif file.include?('Students')
#     epi = file.gsub('Students', 'International')
#     File.rename(file, epi)
#   elsif file.include?('Teachers')
#     epi = file.gsub('Teachers', 'Japanese')
#     File.rename(file, epi)
#   elsif file.include?('teachers')
#     epi = file.gsub('teachers', 'japanese')
#     File.rename(file, epi)
#   end
# end

def change_files(file)
  if file.include?('international')
    epi = file.gsub('international', 'students')
    File.rename(file, epi)
  elsif file.include?('International')
    epi = file.gsub('International', 'Students')
    File.rename(file, epi)
  elsif file.include?('Japanese')
    epi = file.gsub('Japanese', 'Teachers')
    File.rename(file, epi)
  elsif file.include?('japanese')
    epi = file.gsub('japanese', 'teachers')
    File.rename(file, epi)
  end
end

# Dir.glob('./frontend/src/components/pages/__tests__/*').each do |file|
Dir.glob('./frontend/src/components/*').each do |folder|
# Dir.glob('./frontend/src/*').each do |folder|
  Dir.glob("#{folder}/*").each do |file|
    if file.include?("__tests__")
      Dir.glob("#{folder}/__tests__/*").each do |t|
        change_files(t)
      end
    end
    change_files(file)
  end
end

puts 'finish'