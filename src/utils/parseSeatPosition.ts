export const parseSeatPosition = (seatCode: string) => {
  if (!seatCode)
    return {
      section: '',
      seat: [null, null] as [number | null, number | null],
    }

  // seatCode 예시 : A-12-M
  const [section, row, colPosition] = seatCode.split('-')

  const col: Record<string, number> = {
    L: 1,
    M: 2,
    R: 3,
  }

  return {
    section: section,
    seat: [parseInt(row, 10), col[colPosition]] as [
      number | null,
      number | null,
    ],
  }
}
