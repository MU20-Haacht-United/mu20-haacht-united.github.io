import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Teamgeest',
    Svg: require('@site/static/img/hu_team.png').default,
    description: (
      <>
        Ons MU20 team bouwt op sterke teamgeest, inzet en passie voor het mooie spel.
      </>
    ),
  },
  {
    title: 'Focus op Ontwikkeling',
    Svg: require('@site/static/img/hu_development.png').default,
    description: (
      <>
        We ontwikkelen jong talent, verfijnen techniek en bouwen karakter – op én naast het veld. Elke speelster telt.
      </>
    ),
  },
  {
    title: 'Competitieve Ambitie',
    Svg: require('@site/static/img/hu_competition.png').default,
    description: (
      <>
        We streven naar het beste in elke wedstrijd en training. Samen jagen we onze doelen na en vieren we elke overwinning.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
