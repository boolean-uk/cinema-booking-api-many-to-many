# ERD

```mermaid

erDiagram
    CUSTOMER ||--|| CONTACT : has
    SCREEN ||--o{  SCREENING : has 
    MOVIE ||--o{  SCREENING : has 
    SCREEN ||--|{  SEAT : has 
    SCREENING ||--o{ TICKET : has 
    CUSTOMER ||--o{ TICKET : has 
    TICKET ||--|{  TICKETSONSEATS : has 
    SEAT||--|{ TICKETSONSEATS : has 

    CUSTOMER {
        Int id PK
        Int ContactId FK
        DateTime CreatedAt         
        DateTime UpdatedAt 
    }
    CONTACT {
        Int id PK
        Int CustomerId FK
        DateTime CreatedAt         
        DateTime UpdatedAt 
    }
    SCREENING {
        Int id PK
        Int movieId FK
        Int screenId FK
        DateTime CreatedAt         
        DateTime UpdatedAt 
    }
    SCREEN {
        Int id PK
        DateTime CreatedAt         
        DateTime UpdatedAt 
    }
    MOVIE {
        Int id PK
        DateTime CreatedAt         
        DateTime UpdatedAt 
    }
    TICKET {
        Int id PK
        Int screeningId FK
        Int CustomerId FK
        Screen[] tickets 
        DateTime CreatedAt         
        DateTime UpdatedAt 
    }
    SEAT {
        Int id PK
        Ticket[] tickets 
        DateTime CreatedAt         
        DateTime UpdatedAt 
    }
    TICKETSONSEATS {
        Ticket  ticket 
        Int     ticketId    FK 
        Seat    seat
        Int     seatId      FK
        Boolean sold
        Boolean discount
    }

```
