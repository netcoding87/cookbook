import Datastore from 'nedb'
import path from 'path'
import { DB_MEASURES, ROOT } from '../utils/config'



const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_MEASURES}`,
  autoload: true,
})

export interface Measure {
  _id: string
  name: string
}

export const init = () => {
  const defaults = [
    {
      _id: '1',
      name: ' ',
    },
    {
      _id: '2',
      name: 'B',
    },
    {
      _id: '3',
      name: 'Bl',
    },
    {
      _id: '4',
      name: 'Bd',
    },
    {
      _id: '5',
      name: 'Dose',
    },
    {
      _id: '6',
      name: 'EL',
    },
    {
      _id: '7',
      name: 'g',
    },
    {
      _id: '8',
      name: 'kg',
    },
    {
      _id: '9',
      name: 'l',
    },
    {
      _id: '10',
      name: 'ml',
    },
    {
      _id: '11',
      name: 'Msp',
    },
    {
      _id: '12',
      name: 'Pk',
    },
    {
      _id: '13',
      name: 'Prise',
    },
    {
      _id: '14',
      name: 'St',
    },
    {
      _id: '15',
      name: 'Stange',
    },
    {
      _id: '16',
      name: 'Tas',
    },
    {
      _id: '17',
      name: 'TL',
    },
    {
      _id: '18',
      name: 'Würfel',
    },
  ]

  defaults.forEach(category => db.insert(category))
}

export const getAll = (): Promise<Measure[]> => {
  return new Promise(resolve => {
    db.find({}, (err: any, docs: any) => {
      resolve(docs)
    })
  })
}

export const getById = (id: string): Promise<Measure | null> => {
  return new Promise(resolve => {
    db.findOne({ _id: id }, (err, doc) => {
      resolve(doc)
    })
  })
}
