import {City, Country, EventFilter, EventLocation} from "../../models/event.model";
import {v4 as uuidv4} from "uuid";

export const locationOptions: EventLocation[] = [
  {
    id: uuidv4(),
    country: Country.UNITED_KINGDOM,
    city: City.LONDON,
  },
  {
    id: uuidv4(),
    country: Country.GERMANY,
    city: City.BERLIN,
  }
];

export const defaultEventFilter: EventFilter = {
  startTime: new Date('2021-10-01T00:00:00.000'),
  endTime: new Date('2021-10-31T00:00:00.000'),
  location: locationOptions[0]
}
