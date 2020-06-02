### CO2-Calculator
A program to calculate the CO2 consumption based on the start and end cities

Following are the pre-requisities for the program.
### Node
- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.
If the installation was successful, you should be able to run the following command.

    node --version
    v10.16.3

    npm --version
    6.9.0

## API Key
Please get the API generated from the following [openrouteservice](https://openrouteservice.org/)
Then you need to set the generated key in your environment variable ORS_TOKEN of your system.

## Install

     Use the zip file and unzip it.
     cd <To the Project folder where you unzipped your project>
     npm run install-link

## Running the unit test

    npm run test
    
## Running the project

    npm start
       or
    co-calculator


Please use the following *commands* to run various scenarios.
1.  To check CO2 equivalent between to cities.\
   *co2-calculator --start "delhi" --end "bangalore" --transportation-method large-petrol-car*\
    Output: Your trip caused 589.5 kg of CO2-equivalent.

2. To check CO2 equivalent between to cities with one invalid city.\
  *co2-calculator --start "delhi" --end "bangaloreNOT" --transportation-method large-petrol-car*\
   Output: The route doesn't exist between start and end cities. Please try with other cities.

3. To check CO2 equivalent between to cities where route not possible.\
  *co2-calculator --start "delhi" --end "New York" --transportation-method large-petrol-car*\
   Output: Use another means of transportation, route not possible.
