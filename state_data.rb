require 'csv'
require 'socket'
#CREATES A SERVER ON PORT 3000


server  = TCPServer.new('localhost', 3000)
client =socket.accept
 
puts("server started on port 3000")
puts "new client: #{client}"

loop {
  client  = server.accept
  request = client.readpartial(2048)
  puts("server started on port 3000")
  puts request
}

=begin
This project is to create a web API that returns data about the fifty US states. In particular, 
the data revolves around the following:

Median household income (2016)
Percentage of unemployed population (2016)
Percentage of population that lives in metro areas (2015)
Percentage of adults 25 and older with high-school degree (2019)
The API should return this data for each of the US states. In addition, it should also provide the 
full state name (e.g. "Florida") as well as the state's abbreviation (e.g. "FL").

We've provided two CSV files. The state_data.csv file contains the primary data, and the abbreviations.csv file contains 
the abbreviations for each state.

If you prefer, you can move the data from the CSV files into a database. However, we'd like to see the script you use to do 
so. (That is, don't copy and paste the data manually into the database!)
=end

# pp CSV.read("state_data.csv")

# table = CSV.parse(File.read("state_data.csv"), headers: true)
# pp table["state"]

#parse csv to add csv STATE data to an array of hashes
state_data = []
CSV.foreach("state_data.csv", headers: true, header_converters: :symbol) do |row|
  headers ||= row.headers
  state_data << row.to_h
end

#parse csv to add csv ABBREVIATION data to an array of hashes
abbreviations = []
CSV.foreach("abbreviations.csv",headers: true, header_converters: :symbol) do |row|
  headers ||= row.headers
  abbreviations << row.to_h
end

puts("State data=================================: ", state_data[0])
puts("abbreviations=================================: ", abbreviations)

#maybe parse state_data array of objects to use the class below  to create new statedata objects? 
# class StateData
#   def initialize(median_household_income, percent_unemployed, percent_metro, percent_25_hs_degree)
#     @median_household_income = median_household_income
#     @percent_unemployed = percent_unemployed
#     @percent_metro = percent_metro
#     @percent_25_hs_degree = percent_25_hs_degree
#   end

def print_data(state_arr, abbrev)
  index = 0
  while index < state_arr.length
    puts("#{state_arr[index][:state]}, #{abbrev[index][:code]}")
    index += 1
  end
end
 
print_data(state_data, abbreviations)

# end


