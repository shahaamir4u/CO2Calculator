### CO2-Calculator
A program to calculate the CO2 consumption based on the start and end cities.

### Node
- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.
If the installation was successful, you should be able to run the following commands.

    node --version
    v10.16.3

    npm --version
    6.9.0

## API Key
Please get the API generated from the following [openrouteservice](https://openrouteservice.org/)
Then you need to set the generated key in your environment variable ORS_TOKEN of your system.

## Install
Use the zip file shared and unzip it.
     
     cd <To the folder where you unzipped the file>
     npm run install-link

## Running the unit test

    npm run test
    
## Running the CLI
Use one of the ways to start the program:

    npm start
    co2-calculator

The above **commands** will inform the user how to use the program using the command **co2-calculator**. 

 co2-calculator will calculate CO2 equivalent consumption for your trip.

    usage:
      co2-calculator <options>

      options can be:

      --start:                 start city of your trip within double quotes
      --end:                   end city of your trip within double quotes
      --transportation-method: transportation vehicle of your trip

      Command Example:

      co2-calculator --start "delhi" --end "bangalore" --transportation-method large-petrol-car

      Valid transportation-method can be any of the following:

      small-diesel-car
      small-petrol-car
      small-plugin-hybrid-car
      small-electric-car
      medium-diesel-car
      medium-petrol-car
      medium-plugin-hybrid-car
      medium-electric-car
      large-diesel-car
      large-petrol-car
      large-plugin-hybrid-car
      large-electric-car
      bus
      train

Please use the following *command examples* to run various scenarios as:
1.  To check CO2 equivalent between two cities.\
   *co2-calculator --start "delhi" --end "bangalore" --transportation-method large-petrol-car*\
    Output: Your trip caused 589.5 kg of CO2-equivalent.

2. To check CO2 equivalent between two cities with one invalid city.\
  *co2-calculator --start "delhi" --end "bangaloreNOT" --transportation-method large-petrol-car*\
   Output: The route doesn't exist between start and end cities. Please try with other cities.

3. To check CO2 equivalent between two cities where route not possible.\
  *co2-calculator --start "delhi" --end "New York" --transportation-method large-petrol-car*\
   Output: Use another means of transportation, route not possible.
