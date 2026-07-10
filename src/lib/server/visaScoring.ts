import "server-only";

import visaPairLookup from "@/lib/server/data/visaPairLookup.json";
import { COUNTRIES } from "@/lib/countries";
import {
  averageVisaScoreForDestination,
  formatVisaRequirementText,
  scoreRequirement,
} from "@/lib/visaScoringLogic";

const pairLookup = visaPairLookup as Record<string, string>;

interface VisaAssessment {
  visaScore: number;
  visaRequirements?: string;
}

function resolveCountryName(country: string): string {
  if (COUNTRIES.includes(country as (typeof COUNTRIES)[number])) {
    return country;
  }

  const match = COUNTRIES.find(
    (name) => name.toLowerCase() === country.toLowerCase()
  );

  return match ?? country;
}

function lookupRequirement(
  nationality: string,
  destination: string
): string | undefined {
  return pairLookup[`${nationality}|${destination}`];
}

export function getVisaAssessment(
  destination: string,
  duration: number,
  nationality?: string
): VisaAssessment {
  const resolvedDestination = resolveCountryName(destination);

  if (!nationality) {
    return {
      visaScore: averageVisaScoreForDestination(
        pairLookup,
        resolvedDestination,
        duration
      ),
    };
  }

  const resolvedNationality = resolveCountryName(nationality);
  const requirement = lookupRequirement(
    resolvedNationality,
    resolvedDestination
  );
  const visaScore = scoreRequirement(requirement, duration);

  return {
    visaScore,
    visaRequirements: formatVisaRequirementText(
      resolvedNationality,
      requirement
    ),
  };
}
