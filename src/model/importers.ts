import Grid from './Grid'
import { makeStandardGrid } from './factory'
import { setActual } from './updaters'

type Importer = (content: string) => Grid

export const importStandardGrid: Importer = content => {
    let grid = makeStandardGrid()
    let id = 0

    for (let i = 0; i < content.length; i++) {
        switch (content[i]) {
            case '.':
                id++
                break
            case '1':
                grid = setActual(grid, id++, 1)
                break
            case '2':
                grid = setActual(grid, id++, 2)
                break
            case '3':
                grid = setActual(grid, id++, 3)
                break
            case '4':
                grid = setActual(grid, id++, 4)
                break
            case '5':
                grid = setActual(grid, id++, 5)
                break
            case '6':
                grid = setActual(grid, id++, 6)
                break
            case '7':
                grid = setActual(grid, id++, 7)
                break
            case '8':
                grid = setActual(grid, id++, 8)
                break
            case '9':
                grid = setActual(grid, id++, 9)
                break
            default:
                break
        }
    }

    return grid
}
