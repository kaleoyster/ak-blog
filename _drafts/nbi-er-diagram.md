---
layout: post
title: er-diagram
---



| Attribute name                                             | Data type |  Value  |  Rules |  Nullable | Constraint | PK/FK                     |
|------------------------------------------------------------|-----------|---------|--------|-----------|------------|---------------------------|
| structure_number                                           | varchar   |         |        | not null  |            | primary key / foreign key |
| county_code                                                | numeric   |         |        |           |            |                           |
| state_code                                                 | numeric   |         |        | not null  |            | foreign key               |
| place_code                                                 | numeric   |         |        |           |            |                           |
| inventory_route_number                                     | numeric   |         |        |           |            |                           |
| highway_agency_district                                    | numeric   |         |        |           |            |                           |
| record_type                                                | numeric   |         |        |           |            |                           |
| route_signing_prefix                                       | numeric   |         |        |           |            |                           |
| designated_level_of_service                                | numeric   |         |        |           |            |                           |
| directional_suffix                                         | numeric   |         |        |           |            |                           |
| features_intersected                                       | numeric   |         |        |           |            |                           |
| critical_facility_indicator                                | numeric   |         |        |           |            |                           |
| facility_carried_by_structure                              | numeric   |         |        |           |            |                           |
| location                                                   | numeric   |         |        |           |            |                           |
| inventory_rte_min_ver_clearance                            | numeric   |         |        |           |            |                           |
| kilometerpoint                                             | numeric   |         |        |           |            |                           |
| base_highway_point                                         | bool      |         |        |           |            |                           |
| lrs_inventory_route                                        | numeric   |         |        |           |            |                           |
| latitude                                                   | numeric   |         |        |           |            |                           |
| toll                                                       | numeric   |         |        |           |            | foreign key               |
| owner                                                      | numeric   |         |        |           |            |                           |
| functional_class_of_invetory_rte                           | numeric   |         |        |           |            |                           |
| maintenance_responsibility                                 | numeric   |         |        |           |            | foreign key               |
| year_built                                                 | numeric   |         |        |           |            |                           |
| lanes_on_structure                                         | numeric   |         |        |           |            |                           |
| average_daily_traffic                                      | numeric   |         |        |           |            |                           |
| year_of_average_daily_traffic                              | numeric   |         |        |           |            |                           |
| design_load                                                | numeric   |         |        |           |            |                           |
| approach_roadway_width                                     | numeric   |         |        |           |            |                           |
| bridge_median                                              | numeric   |         |        |           |            | foreign key               |
| skew                                                       | numeric   |         |        |           |            |                           |
| structure_flared                                           | bool      |         |        |           |            |                           |
| bridge_railings                                            | varchar   |         |        |           |            |                           |
| transitions                                                | varchar   |         |        |           |            |                           |
| approach_guard_rail                                        | varchar   |         |        |           |            |                           |
| approach_guard_rail_end                                    | varchar   |         |        |           |            |                           |
| historic_significance                                      | numeric   |         |        |           |            | foreign key               |
| navigation_control                                         | varchar   |         |        |           |            |                           |
| navigation_vertical_clearance                              | numeric   |         |        |           |            |                           |
| navigation_horizontal_clearance                            | numeric   |         |        |           |            |                           |
| structure_open_posted_closed                               | numeric   |         |        |           |            | foreign key               |
| type_of_service_on_bridge                                  | numeric   |         |        |           |            |                           |
| type_of_service_under_bridge                               | numeric   |         |        |           |            |                           |
| kind_of_material_design                                    | numeric   |         |        |           |            |                           |
| type_of_design_construction                                | numeric   |         |        |           |            |                           |
| number_of_approach_spans                                   | numeric   |         |        |           |            |                           |
| inventory_rte_total_horz_clearance                         | numeric   |         |        |           |            |                           |
| length_of_maximum_span                                     | numeric   |         |        |           |            |                           |
| structure_length                                           | numeric   |         |        |           |            |                           |
| left_curb_sidewalk_width                                   | numeric   |         |        |           |            |                           |
| right_curb_sidewalk_width                                  | numeric   |         |        |           |            |                           |
| bridge_roadway_width_curb_to_curb                          | numeric   |         |        |           |            |                           |
| deck_width_out_to_out                                      | numeric   |         |        |           |            |                           |
| min_vert_clear_over_bridge_roadway                         | numeric   |         |        |           |            |                           |
| minimum_vertical_underclearance_reference_feature          | numeric   |         |        |           |            |                           |
| minimum_vertical_underclearnace                            | numeric   |         |        |           |            |                           |
| minimum_lateral_underclearance_reference_feature           | numeric   |         |        |           |            |                           |
| minimum_lateral_underclearance                             | numeric   |         |        |           |            |                           |
| channel_channel_protection                                 | numeric   |         |        |           |            | foreign key               |
| culverts                                                   | varchar   |         |        |           |            |                           |
| method_used_to_determine_inventory_rating                  | numeric   |         |        |           |            | foreign key               |
| structural_evaluation                                      | numeric   |         |        |           |            | foreign key               |
| deck_geometry                                              | numeric   |         |        |           |            | foreign key               |
| underclear_vertical_horizontal                             | numeric   |         |        |           |            | foreign key               |
| bridge_posting                                             | numeric   |         |        |           |            | foreign key               |
| water_adequacy                                             | numeric   |         |        |           |            | foreign key               |
| approach_roadway_alignment                                 | numeric   |         |        |           |            | foreign key               |
| neighboring_state_code                                     | numeric   |         |        |           |            |                           |
| percentage_responsibility                                  | numeric   |         |        |           |            |                           |
| border_bridge_structure_number                             | numeric   |         |        |           |            |                           |
| STRAHNETH_highway_designation                              | numeric   |         |        |           |            |                           |
| parallel_structure_designation                             | numeric   |         |        |           |            |                           |
| direction_of_traffic                                       | numeric   |         |        |           |            | foreign key               |
| parallel_struture_designation                              | numeric   |         |        |           |            |                           |
| temporary_structure_designation                            | numeric   |         |        |           |            |                           |
| highway_system_of_inventory_route                          | bool      |         |        |           |            |                           |
| federal_lands_highways                                     | numeric   |         |        |           |            | foreign key               |
| deck_structure_type                                        | numeric   |         |        |           |            | foreign key               |
| type_of_wearing_surface                                    | numeric   |         |        |           |            |                           |
| type_of_membrane                                           | numeric   |         |        |           |            |                           |
| deck_protection                                            | numeric   |         |        |           |            |                           |
| designated_national_network                                | bool      |         |        |           |            |                           |
| pier_abutment_protection                                   | numeric   |         |        |           |            | foreign key               |
| nbi_bridge_length                                          | varchar   |         |        |           |            |                           |
| minimum_navigation_vertical_clearance_vertical_lift_bridge | numeric   |         |        |           |            |                           |
| federal_agency_indicator                                   | numeric   |         |        |           |            |                           |
| deduct_code                                                | numeric   |         |        |           |            |                           |
