class BookedUser < ApplicationRecord
    belongs_to :calendar
    has_many :priorities
    has_many :question_answers
end
