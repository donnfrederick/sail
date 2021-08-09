module Organizations
  class NhsController < UsersController
    include Concerns::Language
    include Concerns::Industries
    include Concerns::Nhs
  end
end
