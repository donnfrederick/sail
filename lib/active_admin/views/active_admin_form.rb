module ActiveAdmin
  module Views
    class ActiveAdminForm
      def protected_input(*args)
        _attr, option = args
        append_option = object.persisted? ? { input_html: { disabled: true } } : {}
        args[1] = option.to_h.merge(append_option)
        input(*args)
      end
    end
  end
end
