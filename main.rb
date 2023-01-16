require_relative 'helpers.rb'
# require_relative 'users.rb'

# declare new instance of boolean class winner_exists and set to false
no_winner = true

# declare rounds variable to control loop
round_index = 0

# create new instance of User class user_one  
# create new instance of User class user_two

# call create_gameboard and store in gameboard
gameboard = create_gameboard()

puts "\n\n\n--------------------INSTRUCTIONS--------------------"
puts "Enter 2 digit pairs such as 00 or 22 to select where to make your move.\n\n"
puts "X goes first.\n\n\nBoard:"

# display gameboard
display_gameboard(gameboard)

# initialize a new game with a while loop while winner_exists == false
while no_winner
  # call get_user_input for user_one 
  get_user_input("X", gameboard)
  # display gameboard
  display_gameboard(gameboard)
  # call get_user_input for user_two
  no_winner = no_winner_identified?(gameboard)
  if no_winner == false
    break
  end

  if round_index > 3
    puts "No winner identified"
    break 
  end
  get_user_input("O", gameboard)
  # display gameboard
  display_gameboard(gameboard)
  # call is_winner? and store in winner_exists
  no_winner = no_winner_identified?(gameboard)
  round_index += 1
end
