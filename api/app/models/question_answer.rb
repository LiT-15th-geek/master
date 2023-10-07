class QuestionAnswer < ApplicationRecord
  belongs_to :booked_user
  belongs_to :question
end
