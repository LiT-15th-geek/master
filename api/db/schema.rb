# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_07_050928) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "booked_user_schedules", force: :cascade do |t|
    t.integer "event_id"
    t.integer "BookedUser_id"
    t.datetime "startTime"
    t.datetime "endTime"
    t.boolean "vague"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "booked_users", force: :cascade do |t|
    t.integer "calendar_id"
    t.string "nickname"
    t.string "password"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "calendars", force: :cascade do |t|
    t.string "team_title"
    t.string "description"
    t.string "user_id"
    t.boolean "is_private"
    t.boolean "is_delete"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "event_questions", force: :cascade do |t|
    t.integer "question_id"
    t.integer "event_id"
    t.boolean "is_selected"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer "Calendar_id"
    t.string "event_title"
    t.string "description"
    t.date "term_start_day"
    t.date "term_end_day"
    t.string "location"
    t.string "user_id"
    t.boolean "RecurrenceSetting"
    t.integer "RequireTime"
    t.datetime "desidedTime"
    t.boolean "is_delete"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "priorities", force: :cascade do |t|
    t.integer "BookedUser_id"
    t.integer "event_id"
    t.integer "priority"
    t.boolean "must"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "question_answers", force: :cascade do |t|
    t.integer "question_id"
    t.integer "BookedUser_id"
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string "questionTitle"
    t.boolean "is_default"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_answers", force: :cascade do |t|
    t.string "user_id"
    t.integer "question_id"
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_calenders", force: :cascade do |t|
    t.string "user_id"
    t.integer "calendar_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
