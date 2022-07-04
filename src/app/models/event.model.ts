export interface EventModel {
  id: string,
  title: string,
  flyerFront: string,
  attending: number,
  date: Date,
  startTime: Date,
  endTime: Date,
  contentUrl: string,
  venue: Venue,
  pick: Pick,
  artists: Artist[],
  images: EventImage[],
  city: string,
  country: string,
  private: boolean
}

export interface Venue {
  id: string,
  name: string,
  contentUrl: string,
  live: boolean,
  direction: string
}

export interface Pick {
  id: string,
  blurb: string
}

export interface Artist {
  id: string,
  name: string,
}

export interface EventImage {
  id: string,
  filename: string,
}

export interface EventDateGroup {
  date: Date,
  events: EventModel[]
}

export interface EventLocation {
  id: string
  city: City,
  country: Country
}

export interface EventFilter {
  startTime: Date,
  endTime: Date,
  location: EventLocation
}

export enum Country {
  UNITED_KINGDOM = 'uk',
  GERMANY = 'de'
}

export enum City {
  LONDON = 'london',
  BERLIN = 'berlin'
}

