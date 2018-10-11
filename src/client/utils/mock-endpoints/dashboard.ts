import { DashboardEndpointsData } from '@shared/endpoints/dashboard'

export const dashboardMockEndpoints: DashboardEndpointsData = {
  get: () =>
    new Promise(resolve =>
      resolve([
        {
          title: 'Round of 16',
          matchDays: [
            {
              days: [
                {
                  title: 'Tuesday',
                  fixtures: [
                    {
                      awayTeam: { name: 'Bayern Münich', logo: '/' },
                      homeTeam: { name: 'Juventus', logo: '/' },
                      matchStart: '2018-01-02 18:00:00'
                    },
                    {
                      awayTeam: { name: 'Valencia', logo: '/' },
                      homeTeam: { name: 'Manchester City', logo: '/' },
                      matchStart: '2018-01-02 21:00:00'
                    },
                    {
                      awayTeam: { name: 'PSG', logo: '/' },
                      homeTeam: { name: 'Napoli', logo: '/' },
                      matchStart: '2018-01-02 21:00:00'
                    }
                  ]
                },
                {
                  title: 'Wednesday',
                  fixtures: [
                    {
                      awayTeam: { name: 'Real Madrid', logo: '/' },
                      homeTeam: { name: 'Basel', logo: '/' },
                      matchStart: '2018-01-03 21:00:00'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ])
    )
}
