import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  ConcludeRoundRequest,
  CreateTournamentRequest,
  ModifyTournamentRequest,
} from '@shared/endpoints/tournament'
import { MatchWinner } from '@shared/models/match-winner'
import { Round } from '@shared/models/round'
import { FixtureEntity } from 'entities/fixture'
import { TournamentEntity } from 'entities/tournament'
import { Repository } from 'typeorm'

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(FixtureEntity)
    private readonly fixtureRepository: Repository<FixtureEntity>,
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepository: Repository<TournamentEntity>
  ) {}

  private toSlug(name: string) {
    return name.replace(/(\ |\/)/g, '-').toLowerCase()
  }

  private getNextRound(round: Round): Round {
    switch (round) {
      case Round.SemiFinals:
        return Round.Final
      case Round.QuarterFinals:
        return Round.SemiFinals
      case Round.RoundOf16:
        return Round.QuarterFinals
    }

    throw new InternalServerErrorException()
  }

  async get(id: number) {
    const tournament = await this.tournamentRepository.findOneOrFail(id)

    return {
      id: tournament.id,
      name: tournament.name,
      slug: this.toSlug(tournament.name),
    }
  }

  async getAll() {
    return (await this.tournamentRepository.find()).map((tournament) => ({
      id: tournament.id,
      name: tournament.name,
      slug: this.toSlug(tournament.name),
    }))
  }

  async create(request: CreateTournamentRequest) {
    const tournament = await this.tournamentRepository.save({
      name: request.name,
    })

    await this.fixtureRepository.save(
      request.fixtures.map((fixture) => ({
        tournamentId: tournament.id,
        awayTeam: fixture.awayTeam,
        homeTeam: fixture.homeTeam,
        round: request.firstRound,
        firstMatchStart: fixture.firstMatchStart,
        secondMatchStart: fixture.secondMatchStart,
        matchWinner: MatchWinner.None,
        score: '',
      }))
    )

    return { ...tournament, slug: this.toSlug(tournament.name) }
  }

  async modify(request: ModifyTournamentRequest) {
    await this.tournamentRepository.update(
      {
        id: request.id,
      },
      {
        name: request.name,
      }
    )

    return { ...request, slug: this.toSlug(request.name) }
  }

  async concludeRound(request: ConcludeRoundRequest) {
    const round = this.getNextRound(
      (
        await this.fixtureRepository.findOneOrFail(
          { tournamentId: request.id },
          {
            order: { round: 'DESC' },
          }
        )
      ).round
    )

    console.log(
      request.fixtures.map((fixture) => ({
        tournamentId: request.id,
        awayTeam: fixture.awayTeam,
        homeTeam: fixture.homeTeam,
        round,
        firstMatchStart: fixture.firstMatchStart,
        secondMatchStart: fixture.secondMatchStart,
        matchWinner: MatchWinner.None,
        score: '',
      }))
    )

    await this.fixtureRepository.save(
      request.fixtures.map((fixture) => ({
        tournamentId: request.id,
        awayTeam: fixture.awayTeam,
        homeTeam: fixture.homeTeam,
        round,
        firstMatchStart: fixture.firstMatchStart,
        secondMatchStart: fixture.secondMatchStart,
        matchWinner: MatchWinner.None,
        score: '',
      }))
    )
  }
}
