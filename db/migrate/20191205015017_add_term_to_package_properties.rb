class AddTermToPackageProperties < ActiveRecord::Migration[5.2]
  def change
    unless PackageProperty.column_names.include? "term"
      add_column :package_properties, :term, :string, index: true, default: PackageProperty::INTERVAL_MONTHLY
    end
  end
end
