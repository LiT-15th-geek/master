class Question < ApplicationRecord
  has_many :user_answers
  has_many :question_answers
  has_many :event_questions
end
