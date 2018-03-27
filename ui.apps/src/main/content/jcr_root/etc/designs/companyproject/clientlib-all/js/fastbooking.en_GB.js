
    //The configuration object for our calendar widget
    var fastbooking_widget_configuration = {
        "params": {
            //Calendar parameters
            "calendar": {
                //Specifies which day of week should be used as first on the calendar
                "firstDayOfWeek": 1,
                //Specifies the number of months to be displayed
                "nbMonths2display": 2,
                //Specifies the calendar widget's title
                "title": "Book a room",
                //Show the "Best price" indicators on the calendar?
                "showBestPrice": true,
                //Show the "Last rooms available" indicators on the calendar?
                "showLastRoom": true,
                //Use the "Dark" theme?
                "themeDark": false,
                //Are we requesting prices for a specific accommodation type?
                "forceRoom": false,
                //If the above parameter is true, force the accommodation type to this value
                "roomForced": "",
                //Are we requesting prices for a specific rate?
                "forceRate": false,
                //If the above parameter is true, force the rate to this value
                "rateForced": "",
                //Enables/disables the selection of children age
                "showChildrenAges": true,
                //Use Layout #2
                "layoutNum": 2
            },
            //locale (language) identifier  in POSIX-style. list of supported languages available here:
            //http://dev.fbwebprogram.com/websdk-docs/#internationalization-i18n
            "locale": "en_GB",
            //Currency to display prices in
            "currency": "EUR",
            //Hotel identifier (hid) for the default property (pre-selected at load)
            //If a "hotels" array is specified, property can be omitted and the first hotel will be used by default
            //"property":"frlyo15269",

            //Selected Region: will pre-select the first hotel in the region
            //HINT: If also "property" is passed, "selected_region" wins
            //"selected_region": "confluence",

            //color for highlighted UI elements on the widget
            "mainColor": "#a67b1c",
            //Maximum children age
            "childrenMaxAge": 12,
            //Enable hotel selector?
            "hotel_selector": true,
            //Enable display of regions inside the hotel selector?
            "hotel_selector_use_regions": false,


            //Configures the list of hotels
            // "name" is the human-readable name for this property
            // "hid"  is the hotel identifier at FASTBOOKING
            // "region" is the identifier for the region of this hotel
            // "city" (optional) is the name of the city for this hotel. Will be displayed in the selector
            "hotels": [
                
                        {
                            "name": "Resort BarriÃ¨re Lille",
                            "hid": "frlil27839",
                            "city": "Lille",
                            "region": "HAUTS_DE_FRANCE"
                        },
                        {
                            "name": "L'HÃ´tel du Golf",
                            "hid": "frdea27830",
                            "city": "Deauville",
                            "region": "NORMANDIE"
                        },
                        {
                            "name": "Le Normandy",
                            "hid": "frdea27832",
                            "city": "Deauville",
                            "region": "NORMANDIE"
                        },
                        {
                            "name": "Le Royal - Deauville",
                            "hid": "frdea27831",
                            "city": "Deauville",
                            "region": "NORMANDIE"
                        },
                        {
                            "name": "L'HÃ´tel du Lac",
                            "hid": "freng27828",
                            "city": "Enghien-Les-Bains",
                            "region": "ILE_DE_FRANCE"
                        },
                        {
                            "name": "Le Grand HÃ´tel - Enghien",
                            "hid": "freng27827",
                            "city": "Enghien-Les-Bains",
                            "region": "ILE_DE_FRANCE"
                        },
                        {
                            "name": "Le Fouquet's Paris",
                            "hid": "frpar27829",
                            "city": "Paris",
                            "region": "ILE_DE_FRANCE"
                        }
            ],
            //Associates region identifiers to their names
            "region_names": {
                
                'HAUTS_DE_FRANCE': "Hauts-de-France",
                'NORMANDIE': "Normandie",
                'ILE_DE_FRANCE': "ÃŽle de France"
            }
        },
        //This is the authorization token for WebSDK. It is provided by FASTBOOKING
        "_authCode": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOiJeLiokIiwicHJvcGVydGllcyI6Il4oZnJ8bWEpW2Etel17M30yNzhcXGR7Mn0kIiwiZ3JvdXBzIjoiXiQiLCJmb3IiOiJCYXJyaWVyZSIsImlhdCI6MTQ4ODQ1NDgyNiwianRpIjoiZDJlZTY2ZWYtODI5NC00YmIyLThlMDYtYTc1MzNkY2FkN2U4In0.jkxAaGdTj4Hem4vIh1QwE6acK0UOxgYiXyGEmhdKFck"
    };