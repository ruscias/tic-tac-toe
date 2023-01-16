def create_gameboard()
  gameboard = Array.new(3) {Array.new(3)}

  gameboard.each_with_index do |row, i|
    row.each_with_index do |column, j|
      gameboard[i][j] = "#{i.to_s}#{j.to_s}"
    end
  end
  return gameboard
end

def display_gameboard(gameboard)
  puts "----------------"
  gameboard.each_with_index do |row, i|
    row.each_with_index do |column, j|
      print "| #{gameboard[i][j]} "
    end
    puts "|"
    puts "----------------"
  end
end

def choice_is_invalid?(choice, gameboard)
  
  # verify size of user input is explicitly two
  if choice.length != 2 
    puts "Length of user provided input is too long. Please only enter two digits."
    return true
  end

  # verify remaining elements are 0, 1, or 2
  choice.each do |element|
    if element.ord < 48 || element.ord > 50
      puts "Input that is not between 0 and 2 identified. Please only enter valid numberic coordinates using 0, 1, or 2."
      return true
    end
  end

  # verify position is not already taken
  i = choice[0].to_i
  j = choice[1].to_i
  gameboard_selection = gameboard[i][j]
  if gameboard_selection == " X" || gameboard_selection == " O"
    puts "User input is a valid combination; however, the gameboard coordinates are already occupied with selection #{gameboard_selection}."
    display_gameboard(gameboard)
    return true
  end

  return false
end     

def get_user_input(game_piece, gameboard)
  execute_loop = true
  while execute_loop
    puts "#{game_piece}'s move:"
    choice = gets.chomp.split("")
    execute_loop = choice_is_invalid?(choice, gameboard)
    puts ""
  end
  i = choice[0].to_i
  j = choice[1].to_i
  gameboard[i][j] = " #{game_piece}"
end

def no_winner_identified?(gameboard)
  gameboard.each_with_index do |row|
    if row[0] == row[1] && row[0] == row[2]
      p row
      puts "Horizontal winner found"
      return false
    end
  end

  gameboard[0].each_with_index do |col, col_i|
    if col == gameboard[1][col_i] && col == gameboard[2][col_i]
      puts "Vertical winner found"
      return false
    end
  end

  if gameboard[0][0] == gameboard[1][1] && gameboard[0][0] == gameboard[2][2]
    puts "Cross winner found"
    return false
  end  

  if gameboard[0][2] == gameboard[1][1] && gameboard[0][2] == gameboard[2][0]
    puts "Cross winner found"
    return false
  end  
 
  return true
end
