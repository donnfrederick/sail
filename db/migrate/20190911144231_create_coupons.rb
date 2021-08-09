class CreateCoupons < ActiveRecord::Migration[5.2]
  def change
    create_table :coupons do |t|
      t.references :user
      t.string   :name, limit: 191, index: true, default: nil
                 t.string   :code, null: false, unique: true, limit: 191
      t.datetime :expired_at, default: nil
      t.datetime :deleted_at, default: nil

      t.timestamps
    end
  end

  def data
    Coupon.reset_column_information

    second_time = Time.parse("2019-08-23 00:00:00+0900")

    Student.find_each do |student|
      if second_time < student.created_at
        coupon = Coupon.new(
          name: "既存ユーザー値引き#1",
          user: student,
          expired_at: nil,
          )
        coupon.generate_code_old_style(student.email, student.name_en)
        coupon.save!
      else
        coupon = Coupon.new(
          name: "新規ユーザー値引き#1",
          user: student,
          expired_at: nil,
          )
        coupon.generate_code_old_style("20190823-1", student.id)
        coupon.save!
      end
    end
  end
end
