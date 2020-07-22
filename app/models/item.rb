class Item < ApplicationRecord
    validates_inclusion_of :type, :in => %w( Appetizer MainCourse Dessert Drink)
end
