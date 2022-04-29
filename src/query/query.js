import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCTS = gql`
  query category($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        brand
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      gallery
      inStock
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;
