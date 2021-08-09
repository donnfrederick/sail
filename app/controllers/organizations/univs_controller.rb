module Organizations
  class UnivsController < UsersController
    include Concerns::Language
    include Concerns::Industries
    include Concerns::Univs
  end
end
