# SES Event Mapper

A NestJS application that transforms AWS SES-SNS JSON events into a simplified custom format.

## Features

- **Event Mapping**: Converts complex SES/SNS event structures into a flattened, simplified JSON format.
- **Validation**: Uses `class-validator` to ensure input data integrity.
- **Transformation**: Uses `class-transformer` for declarative data mapping and formatting.
- **Custom Logic**:
  - Determines spam/virus/DNS status (PASS/FAIL).
  - Formats dates to full month names (e.g., "September").
  - Calculates processing delays (>1000ms).
  - Extracts usernames from email addresses.

## API Endpoint

### `POST /`

Accepts an AWS SES-SNS event JSON and returns a list of mapped results.

**Request Body:**
```json
{
  "Records": [
    {
      "eventVersion": "1.0",
      "ses": {
        "receipt": { ... },
        "mail": { ... }
      }
    }
  ]
}
```

**Response:**
```json
[
  {
    "spam": true,
    "virus": true,
    "dns": true,
    "mes": "septiembre",
    "retrasado": false,
    "emisor": "user",
    "receptor": ["recipient"]
  }
]
```

### Example cURL Request

Test the endpoint with a sample AWS SES-SNS event from the AWS Lambda test data:

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d @<(curl -s https://raw.githubusercontent.com/aws/aws-lambda-go/refs/heads/main/events/testdata/ses-sns-event.json)
```

## Project Setup

```bash
# Install dependencies
npm install
```

## Running the App

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Testing

```bash
# unit tests
npm run test
```

## Demo


https://github.com/user-attachments/assets/bd97bdc0-780c-49be-a61e-dc8b6f8ee55f

