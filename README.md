# FAPSHI PAYMENT API

A ready-to-use payment API for managing payments with Fapshi.

## Introduction

This payment API allows yo to manage payments with fapshi in a simple and secure way. It provides a RESTful interface for creating payment links, managing invoices, and making online payments.

## Features

- Payment link creation
- Invoice management
- Online payment processing
- Fund management

## Installation

To install the API, follow the steps:

_1. Clone the Github repository:_

```bash
git clone https://github.com/warano02/fapshi-payment-api.git
```

_2. Install dependecies_

```bash
cd fapshi-payment-api
npm install
```

_3. Configure environment variables:_

```bash
cp .env.exemple .env
```

_4. Start the API:_

```bash
npm run dev
```
## Configuration
To configure the API, you need to define the following environment variables:
- FAPSHI_USER : Your Fapshi user key
- FAPSHI_API_KEY : Your Fapshi Api Key 
- MONGODB_URI : Link to connect to your MongoDb database

## Endpoints :

### POST :
- /p/pl : Create a paiment link
