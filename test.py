import pandas as pd

columnsNormalize = [
                    "deck",
                    "yearBuilt",
                    "superstructure",
                    "substructure",
                    "averageDailyTraffic",
                    "avgDailyTruckTraffic",
                    "supNumberIntervention",
                    "subNumberIntervention",
                    "deckNumberIntervention",
# New
                    "latitude",
                    "longitude",
                    "skew",
                    "numberOfSpansInMainUnit",
                    "lengthOfMaximumSpan",
                    "structureLength",
                    "bridgeRoadwayWithCurbToCurb",
                    "operatingRating",
                    "scourCriticalBridges",
                    "lanesOnStructure",

                    "deckDeteriorationScore",
                    "subDeteriorationScore",
                    "supDeteriorationScore"
                    ]


# Select final columns:
columnsFinal = [
#               "deck",
#               "substructure",
#               "superstructure",
                "structureNumber",
                "yearBuilt",
                "averageDailyTraffic",
                "avgDailyTruckTraffic",
                "material",
                "designLoad",
                "snowfall",
                "freezethaw",
                "supNumberIntervention",
                "subNumberIntervention",
                "deckNumberIntervention",
                "latitude",
                "longitude",
                "skew",
                "numberOfSpansInMainUnit",
                "lengthOfMaximumSpan",
                "structureLength",
                "bridgeRoadwayWithCurbToCurb",
                "operatingRating",
                "scourCriticalBridges",
                "lanesOnStructure",
                "toll",
                "designatedInspectionFrequency",
                "deckStructureType",
                "typeOfDesign",
#               "deckDeteriorationScore",
#               "subDeteriorationScore",
#               "supDeteriorationScore"
            ]

a = set(columnsNormalize)
b = set(columnsFinal)
print(b.difference(a))

