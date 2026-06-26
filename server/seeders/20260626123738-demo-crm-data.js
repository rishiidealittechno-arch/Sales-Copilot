'use strict';

const { randomUUID } = require('crypto');

const ROW_COUNT = 50;

const COMPANIES = [
  { name: 'Northwind Analytics', industry: 'Technology', domain: 'northwindanalytics.com' },
  { name: 'Summit Health Partners', industry: 'Healthcare', domain: 'summithealth.io' },
  { name: 'Blue Harbor Logistics', industry: 'Logistics', domain: 'blueharborlogistics.com' },
  { name: 'Vertex Capital Group', industry: 'Finance', domain: 'vertexcapital.com' },
  { name: 'Lumen Retail Collective', industry: 'Retail', domain: 'lumenretail.co' },
  { name: 'Atlas Manufacturing', industry: 'Manufacturing', domain: 'atlasmfg.com' },
  { name: 'BrightPath Education', industry: 'Education', domain: 'brightpathedu.org' },
  { name: 'Solaris Energy Systems', industry: 'Energy', domain: 'solarisenergy.com' },
  { name: 'Cedar & Stone Realty', industry: 'Real Estate', domain: 'cedarstonerealty.com' },
  { name: 'Pulse Media Network', industry: 'Media', domain: 'pulsemedia.net' },
  { name: 'Ironclad Security', industry: 'Technology', domain: 'ironcladsecurity.io' },
  { name: 'Meridian Biotech', industry: 'Healthcare', domain: 'meridianbiotech.com' },
  { name: 'Horizon Freight', industry: 'Logistics', domain: 'horizonfreight.com' },
  { name: 'Oakline Advisors', industry: 'Finance', domain: 'oaklineadvisors.com' },
  { name: 'Nova Commerce', industry: 'Retail', domain: 'novacommerce.shop' },
  { name: 'Forge Industrial', industry: 'Manufacturing', domain: 'forgeindustrial.com' },
  { name: 'Riverstone Academy', industry: 'Education', domain: 'riverstoneacademy.edu' },
  { name: 'Gridline Power', industry: 'Energy', domain: 'gridlinepower.com' },
  { name: 'Parkview Properties', industry: 'Real Estate', domain: 'parkviewprops.com' },
  { name: 'Echo Studios', industry: 'Media', domain: 'echostudios.tv' },
  { name: 'CloudNine Software', industry: 'Technology', domain: 'cloudninesoftware.com' },
  { name: 'WellSpring Clinics', industry: 'Healthcare', domain: 'wellspringclinics.com' },
  { name: 'TransitLink', industry: 'Logistics', domain: 'transitlink.co' },
  { name: 'Pinnacle Trust', industry: 'Finance', domain: 'pinnacletrust.com' },
  { name: 'Urban Threads', industry: 'Retail', domain: 'urbanthreads.com' },
  { name: 'Precision Parts Co.', industry: 'Manufacturing', domain: 'precisionparts.com' },
  { name: 'OpenMind Learning', industry: 'Education', domain: 'openmindlearning.com' },
  { name: 'Aurora Renewables', industry: 'Energy', domain: 'aurorarenewables.com' },
  { name: 'Keystone Holdings', industry: 'Real Estate', domain: 'keystoneholdings.com' },
  { name: 'Signal House', industry: 'Media', domain: 'signalhouse.media' },
  { name: 'DataForge AI', industry: 'Technology', domain: 'dataforge.ai' },
  { name: 'CareBridge Health', industry: 'Healthcare', domain: 'carebridgehealth.com' },
  { name: 'SwiftRoute Delivery', industry: 'Logistics', domain: 'swiftroute.com' },
  { name: 'HarborPoint Bank', industry: 'Finance', domain: 'harborpointbank.com' },
  { name: 'MarketSpring', industry: 'Retail', domain: 'marketspring.co' },
  { name: 'Titan Alloy Works', industry: 'Manufacturing', domain: 'titanalloy.com' },
  { name: 'NextGen Campus', industry: 'Education', domain: 'nextgencampus.edu' },
  { name: 'VoltStream', industry: 'Energy', domain: 'voltstream.com' },
  { name: 'MetroSpace Leasing', industry: 'Real Estate', domain: 'metrospace.com' },
  { name: 'Frame & Form Creative', industry: 'Media', domain: 'frameform.co' },
  { name: 'Stackline DevTools', industry: 'Technology', domain: 'stackline.dev' },
  { name: 'Vitality Labs', industry: 'Healthcare', domain: 'vitalitylabs.com' },
  { name: 'CargoWise', industry: 'Logistics', domain: 'cargowise.io' },
  { name: 'Sterling Wealth', industry: 'Finance', domain: 'sterlingwealth.com' },
  { name: 'Bloom & Co.', industry: 'Retail', domain: 'bloomandco.com' },
  { name: 'Apex Robotics', industry: 'Manufacturing', domain: 'apexrobotics.com' },
  { name: 'ScholarPath', industry: 'Education', domain: 'scholarpath.com' },
  { name: 'GreenGrid Utilities', industry: 'Energy', domain: 'greengrid.com' },
  { name: 'Crestline Estates', industry: 'Real Estate', domain: 'crestlineestates.com' },
  { name: 'Storyline Digital', industry: 'Media', domain: 'storylinedigital.com' },
];

const CONTACTS = [
  { first: 'Elena', last: 'Martinez', title: 'Chief Revenue Officer' },
  { first: 'Marcus', last: 'Chen', title: 'VP of Operations' },
  { first: 'Priya', last: 'Sharma', title: 'Head of Procurement' },
  { first: 'James', last: 'Whitfield', title: 'Director of IT' },
  { first: 'Sophie', last: 'Laurent', title: 'Finance Director' },
  { first: 'Daniel', last: 'Okafor', title: 'VP Engineering' },
  { first: 'Hannah', last: 'Klein', title: 'Sales Manager' },
  { first: 'Ryan', last: 'Patel', title: 'Product Lead' },
  { first: 'Amelia', last: 'Brooks', title: 'Chief Marketing Officer' },
  { first: 'Lucas', last: 'Nguyen', title: 'Account Executive' },
  { first: 'Nina', last: 'Kowalski', title: 'Customer Success Manager' },
  { first: 'Omar', last: 'Hassan', title: 'Solutions Architect' },
  { first: 'Claire', last: 'Dubois', title: 'Head of Partnerships' },
  { first: 'Ethan', last: 'Morales', title: 'Business Development Lead' },
  { first: 'Yuki', last: 'Tanaka', title: 'Operations Manager' },
];

const OPPORTUNITY_TEMPLATES = [
  'Enterprise Platform License',
  'Annual Support Renewal',
  'Professional Services Package',
  'Multi-Year SaaS Subscription',
  'Security Compliance Upgrade',
  'Data Migration Project',
  'Team Expansion Seats',
  'Custom Integration Build',
  'Pilot Program Rollout',
  'Infrastructure Modernization',
];

const DEAL_TEMPLATES = [
  'FY26 Master Agreement',
  'Signed Subscription Contract',
  'Implementation SOW',
  'Renewal Order Form',
  'Expansion Amendment',
  'Pilot Conversion Deal',
  'Multi-Department Rollout',
  'Partner Reseller Agreement',
];

const TASK_TEMPLATES = [
  {
    title: 'Send revised proposal deck',
    description: 'Share updated pricing and implementation timeline with stakeholders.',
    status: 'pending',
  },
  {
    title: 'Schedule executive demo',
    description: 'Book a 45-minute walkthrough with the economic buyer and IT lead.',
    status: 'in_progress',
  },
  {
    title: 'Confirm legal review status',
    description: 'Follow up with procurement on redlines and security questionnaire.',
    status: 'in_progress',
  },
  {
    title: 'Prepare ROI summary',
    description: 'Document projected savings and payback period for finance approval.',
    status: 'pending',
  },
  {
    title: 'Conduct reference call',
    description: 'Connect champion with an existing customer in the same industry.',
    status: 'completed',
  },
  {
    title: 'Finalize contract signature',
    description: 'Coordinate DocuSign routing once commercial terms are approved.',
    status: 'completed',
  },
  {
    title: 'Kick off onboarding workshop',
    description: 'Align customer success, solutions, and client project team.',
    status: 'pending',
  },
  {
    title: 'Review discovery notes',
    description: 'Summarize pain points and success criteria from initial calls.',
    status: 'completed',
  },
];

const STAGES = [
  'Prospecting',
  'Qualification',
  'Proposal',
  'Negotiation',
  'Closed Won',
];

const DEAL_STATUSES = ['open', 'won', 'lost', 'pending'];

function pick(items, index) {
  return items[index % items.length];
}

function daysAgo(baseDate, days) {
  return new Date(baseDate.getTime() - days * 86400000);
}

function daysAhead(baseDate, days) {
  return new Date(baseDate.getTime() + days * 86400000);
}

async function resolveWorkspaceId(queryInterface) {
  if (process.env.SEED_WORKSPACE_ID) {
    return process.env.SEED_WORKSPACE_ID;
  }

  const [organizations] = await queryInterface.sequelize.query(
    'SELECT id FROM organization ORDER BY "createdAt" ASC LIMIT 1',
  );

  if (!organizations.length) {
    throw new Error(
      'No workspace found. Create a workspace in the app first or set SEED_WORKSPACE_ID.',
    );
  }

  return organizations[0].id;
}

async function clearAllCrmData(queryInterface) {
  await queryInterface.bulkDelete('crm_tasks', {});
  await queryInterface.bulkDelete('crm_deals', {});
  await queryInterface.bulkDelete('crm_opportunities', {});
  await queryInterface.bulkDelete('crm_contacts', {});
  await queryInterface.bulkDelete('crm_accounts', {});
}

function buildAccounts(workspaceId, now) {
  const accountIds = Array.from({ length: ROW_COUNT }, () => randomUUID());

  const accounts = accountIds.map((id, index) => {
    const company = pick(COMPANIES, index);
    const createdAt = daysAgo(now, 5 + (index % 90));

    return {
      id,
      workspace_id: workspaceId,
      name: company.name,
      website: `https://www.${company.domain}`,
      industry: company.industry,
      description: `${company.name} is a ${company.industry.toLowerCase()} company evaluating platform expansion and renewal opportunities.`,
      created_at: createdAt,
      updated_at: now,
    };
  });

  return { accountIds, accounts };
}

function buildContacts(workspaceId, accountIds, now) {
  return Array.from({ length: ROW_COUNT }, (_, index) => {
    const company = pick(COMPANIES, index);
    const person = pick(CONTACTS, index);
    const emailLocal = `${person.first}.${person.last}`.toLowerCase();
    const createdAt = daysAgo(now, 3 + (index % 60));

    return {
      id: randomUUID(),
      workspace_id: workspaceId,
      account_id: accountIds[index],
      first_name: person.first,
      last_name: person.last,
      email: `${emailLocal}@${company.domain}`,
      phone: `+1 (${200 + (index % 800)}) ${String(100 + (index % 900)).padStart(3, '0')}-${String(1000 + index).slice(-4)}`,
      title: person.title,
      created_at: createdAt,
      updated_at: now,
    };
  });
}

function buildOpportunities(workspaceId, accountIds, now) {
  return Array.from({ length: ROW_COUNT }, (_, index) => {
    const company = pick(COMPANIES, index);
    const template = pick(OPPORTUNITY_TEMPLATES, index);
    const stage = pick(STAGES, index);
    const amountBase = 15000 + (index % 20) * 7500 + (index % 7) * 1200;
    const createdAt = daysAgo(now, 7 + (index % 75));

    return {
      id: randomUUID(),
      workspace_id: workspaceId,
      account_id: accountIds[index],
      name: `${company.name} — ${template}`,
      stage,
      amount: amountBase.toFixed(2),
      close_date: daysAhead(now, 14 + (index % 45)).toISOString().slice(0, 10),
      created_at: createdAt,
      updated_at: now,
    };
  });
}

function buildDeals(workspaceId, opportunities, now) {
  return opportunities.map((opportunity, index) => {
    const template = pick(DEAL_TEMPLATES, index);
    const stage = opportunity.stage;
    let status = 'open';

    if (stage === 'Closed Won') {
      status = 'won';
    } else if (stage === 'Prospecting') {
      status = 'pending';
    } else if (index % 17 === 0) {
      status = 'lost';
    }

    const dealValue = (Number(opportunity.amount) * (0.85 + (index % 5) * 0.03)).toFixed(
      2,
    );
    const createdAt = daysAgo(now, 2 + (index % 30));

    return {
      id: randomUUID(),
      workspace_id: workspaceId,
      opportunity_id: opportunity.id,
      name: `${template} — ${opportunity.name.split(' — ')[0]}`,
      value: dealValue,
      status,
      created_at: createdAt,
      updated_at: now,
    };
  });
}

function buildTasks(workspaceId, opportunities, now) {
  return Array.from({ length: ROW_COUNT }, (_, index) => {
    const opportunity = opportunities[index];
    const template = pick(TASK_TEMPLATES, index);
    const createdAt = daysAgo(now, 1 + (index % 21));
    const dueDate =
      template.status === 'completed'
        ? daysAgo(now, index % 5)
        : daysAhead(now, 1 + (index % 14));

    return {
      id: randomUUID(),
      workspace_id: workspaceId,
      opportunity_id: opportunity.id,
      title: `${template.title} (${opportunity.name.split(' — ')[0]})`,
      description: template.description,
      status: template.status,
      due_date: dueDate,
      created_at: createdAt,
      updated_at: now,
    };
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const workspaceId = await resolveWorkspaceId(queryInterface);
    const now = new Date();

    await clearAllCrmData(queryInterface);

    const { accountIds, accounts } = buildAccounts(workspaceId, now);
    await queryInterface.bulkInsert('crm_accounts', accounts);

    const contacts = buildContacts(workspaceId, accountIds, now);
    await queryInterface.bulkInsert('crm_contacts', contacts);

    const opportunities = buildOpportunities(workspaceId, accountIds, now);
    await queryInterface.bulkInsert('crm_opportunities', opportunities);

    const deals = buildDeals(workspaceId, opportunities, now);
    await queryInterface.bulkInsert('crm_deals', deals);

    const tasks = buildTasks(workspaceId, opportunities, now);
    await queryInterface.bulkInsert('crm_tasks', tasks);

    console.log(
      `Cleared all CRM data and seeded ${ROW_COUNT} realistic rows per table for workspace ${workspaceId}`,
    );
  },

  async down(queryInterface) {
    await clearAllCrmData(queryInterface);
  },
};
