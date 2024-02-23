export type OrderStatus =
  | 'Awaiting Processing' //*
  | 'Processing' //*
  | 'Ready for Pickup'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered' //*
  | 'Delivery Attempt Unsuccessful'
  | 'Held at Customs' // * alfândega
  | 'Returned to Sender' //*
