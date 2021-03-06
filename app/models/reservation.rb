# == Schema Information
#
# Table name: reservations
#
#  id            :bigint           not null, primary key
#  date          :string           not null
#  time          :string           not null
#  party_size    :integer          not null
#  restaurant_id :integer          not null
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Reservation < ApplicationRecord
    belongs_to :restaurant
    belongs_to :user

    validates :date,
        :party_size,
        presence: true

    validates :time, uniqueness: { scope: [:date, :restaurant_id] }
    validates :user_id, uniqueness: { scope: :restaurant_id }
end
