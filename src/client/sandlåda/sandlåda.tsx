import React from 'react'
import { Button } from 'shared/components/Button/component'
import { Section } from 'shared/components/Section/component'
import { Header } from 'shared/components/Header/component'
import { Toolbar } from 'shared/components/Toolbar/component'
import { SectionTitle } from '@client/shared/components/SectionTitle/component'
import { SectionSubtitle } from '@client/shared/components/SectionSubtitle/component'
import { SectionContent } from '@client/shared/components/SectionContent/component'

interface Props {}

export class Sandlåda extends React.PureComponent<Props> {
  render() {
    return (
      <React.Fragment>
        <Toolbar subtitle="Highscore" />

        <Header>Round of 16th</Header>

        <Section spaced>
          <SectionTitle>Matchday 1</SectionTitle>
          <SectionSubtitle>Tuesday</SectionSubtitle>

          <SectionContent>
            <Button>Liverpool</Button>
            First content
          </SectionContent>

          <SectionSubtitle>Wednesday</SectionSubtitle>

          <SectionContent>Second</SectionContent>
        </Section>

        <Section spaced>
          <SectionTitle>Matchday 2</SectionTitle>
          <SectionSubtitle>Tuesday</SectionSubtitle>

          <SectionContent>
            <Button>Real Madrid</Button>
          </SectionContent>

          <SectionSubtitle>Wednesday</SectionSubtitle>
        </Section>
      </React.Fragment>
    )
  }
}
