import express from 'express'

interface ContextCallbackParams {
  req: express.Request
  res: express.Response
}

export interface ContextType {
  dbConnection: {
    query: () => string
  }
}

const createContext = (params: ContextCallbackParams): ContextType => {
  return {
    dbConnection: { query: () => 'db content' },
  }
}

export default createContext
