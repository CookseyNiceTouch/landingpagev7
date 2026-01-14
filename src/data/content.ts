export const content = {
  home: {
    hero: {
      h1: 'Nice Touch',
      subtitle: 'Your AI Video Edit Assistant',
      videoUrl: 'https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0',
    },
    integrationsPreview: {
      heading: 'Works with your editor',
      premiere: {
        title: 'Adobe Premiere Pro',
        description: 'AI assistant for Premiere Pro',
        url: '/integrations/adobe-premiere-pro',
      },
      resolve: {
        title: 'DaVinci Resolve',
        description: 'AI assistant for DaVinci Resolve',
        url: '/integrations/davinci-resolve',
      },
    },
    workflowsPreview: {
      heading: 'Top workflows',
      linkText: 'Browse all workflows',
    },
    howItWorks: {
      heading: 'How it works',
      steps: [
        { title: 'Connect your editor', description: 'Nice Touch integrates directly with Premiere Pro and DaVinci Resolve.' },
        { title: 'Bring in notes or transcript', description: 'Upload feedback, transcripts, or let Nice Touch analyze your timeline.' },
        { title: 'Apply changes and ship faster', description: 'Review suggestions and apply changes with confidence.' },
      ],
    },
    whoItIsFor: {
      heading: 'Who it is for',
      editors: {
        title: 'Editors',
        description: 'Turn review notes into edits faster. Spend less time on repetitive tasks.',
        url: '/product#for-editors',
      },
      teams: {
        title: 'Teams',
        description: 'Keep projects moving. Reduce bottlenecks between review and delivery.',
        url: '/product#for-teams',
      },
    },
    trust: {
      heading: 'Built for professional workflows',
      description: 'Nice Touch is designed for editors and teams who need reliability and precision.',
      links: [
        { text: 'About Nice Touch', url: '/about' },
        { text: 'Security and data', url: '/security' },
      ],
    },
  },

  product: {
    hero: {
      h1: 'An AI assistant that fits into your editing workflow',
      description: 'Nice Touch helps professional editors and teams turn feedback, transcripts, and QC checks into actions without leaving their timeline.',
    },
    outcomes: [
      { title: 'Faster changes from feedback', description: 'Turn review notes into actionable edits in seconds, not hours.' },
      { title: 'Faster rough cuts from transcript', description: 'Build story-driven rough cuts using transcript analysis and AI assistance.' },
      { title: 'Fewer mistakes at export', description: 'Catch common delivery errors before you ship.' },
    ],
    howItWorks: {
      heading: 'How it works',
      steps: [
        { title: 'Connect', description: 'Nice Touch works inside Premiere Pro and DaVinci Resolve.' },
        { title: 'Bring in context', description: 'Upload feedback, transcripts, or let the AI analyze your project.' },
        { title: 'Review and apply', description: 'See suggestions, make changes, and ship with confidence.' },
      ],
    },
    capabilities: {
      heading: 'Key capabilities',
      groups: [
        {
          title: 'Feedback handling',
          items: ['Timecoded note parsing', 'Multi-format support', 'Priority flagging'],
        },
        {
          title: 'Transcript driven edits',
          items: ['Story structure analysis', 'B-roll suggestions', 'Pacing optimization'],
        },
        {
          title: 'QC checks',
          items: ['Export validation', 'Audio level checks', 'Format compliance'],
        },
      ],
    },
    forEditors: {
      id: 'for-editors',
      heading: 'For editors',
      painPoints: ['Reviewing feedback takes too long', 'Repetitive tasks eat up creative time', 'Late-night fixes before delivery'],
      benefits: ['Apply feedback faster', 'Automate repetitive edits', 'Ship with confidence'],
    },
    forTeams: {
      id: 'for-teams',
      heading: 'For teams',
      painPoints: ['Bottlenecks between review and final delivery', 'Inconsistent quality across editors', 'Hard to scale workflows'],
      benefits: ['Reduce turnaround time', 'Maintain consistent standards', 'Scale without adding complexity'],
    },
    faq: [
      { question: 'Does Nice Touch work offline?', answer: 'Nice Touch requires an internet connection for AI processing, but your project files stay local.' },
      { question: 'What file formats are supported?', answer: 'Nice Touch works with standard video formats supported by Premiere Pro and DaVinci Resolve.' },
      { question: 'Can I use Nice Touch with existing projects?', answer: 'Yes, Nice Touch integrates with your current projects without requiring any changes.' },
      { question: 'Is there a free trial?', answer: 'Join our Early Access program to get hands-on with Nice Touch before launch.' },
      { question: 'How does pricing work?', answer: 'Visit our pricing page for details on Early Access, Team, and Enterprise plans.' },
      { question: 'What happens to my data?', answer: 'Your project files stay local. Visit our security page for full details on data handling.' },
    ],
  },

  integrations: {
    hero: {
      h1: 'Integrations',
      description: 'Nice Touch works directly inside the video editors you already use. No context switching, no exports, no friction.',
    },
    premiere: {
      title: 'Adobe Premiere Pro',
      description: 'AI assistant for Premiere Pro',
      features: [
        'Native panel integration',
        'Timeline-aware suggestions',
        'Keyboard shortcut support',
      ],
      url: '/integrations/adobe-premiere-pro',
    },
    resolve: {
      title: 'DaVinci Resolve',
      description: 'AI assistant for DaVinci Resolve',
      features: [
        'Fusion and edit page support',
        'Color-aware workflows',
        'Marker-based annotations',
      ],
      url: '/integrations/davinci-resolve',
    },
    compatibility: {
      heading: 'General compatibility',
      os: 'Nice Touch runs on macOS and Windows.',
      access: 'Nice Touch accesses your timeline metadata and media references. Your source files stay local and secure.',
    },
    faq: [
      { question: 'Do I need to install anything?', answer: 'Yes, Nice Touch installs as a native extension for your editor.' },
      { question: 'Can I use both Premiere and Resolve?', answer: 'Yes, your Nice Touch license works across both editors.' },
      { question: 'Will this slow down my editor?', answer: 'No, Nice Touch runs in the background and does not impact playback or rendering performance.' },
      { question: 'What versions are supported?', answer: 'We support the latest versions of Premiere Pro and DaVinci Resolve. Check the detail pages for specific version requirements.' },
    ],
  },

  integrationsDetail: {
    premiere: {
      hero: {
        h1: 'AI assistant for Adobe Premiere Pro',
        description: 'Nice Touch integrates directly into Premiere Pro to help you apply feedback, speed up rough cuts, and catch delivery issues.',
        videoUrl: 'https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0',
        videoTitle: 'Nice Touch for Premiere Pro Demo',
        videoTranscript: 'This demo shows how Nice Touch works inside Adobe Premiere Pro. Watch as timecoded feedback is converted into an actionable punch list, rough cuts are built from transcript, and common export issues are flagged before delivery.',
      },
      whatYouCanDo: {
        heading: 'What you can do in Premiere Pro',
        items: [
          'Convert timecoded notes into an actionable punch list',
          'Speed up rough cuts with transcript-driven decisions',
          'Catch common export issues earlier',
        ],
      },
      exampleWorkflow: {
        heading: 'Example workflow',
        steps: [
          'Open your Premiere Pro project',
          'Upload review notes or transcript to the Nice Touch panel',
          'Review AI-generated suggestions mapped to your timeline',
          'Apply changes with one click or fine-tune manually',
          'Run pre-export QC checks before delivery',
        ],
      },
      compatibility: {
        heading: 'Compatibility',
        requirements: ['Premiere Pro 2023 or later', 'macOS 11+ or Windows 10+', 'Internet connection for AI processing'],
        limitations: ['Some legacy codecs may require transcoding', 'Multicam clips are supported with limitations'],
      },
      faq: [
        { question: 'Does it work with Premiere Rush?', answer: 'Not currently. Nice Touch is designed for Premiere Pro.' },
        { question: 'Can I use keyboard shortcuts?', answer: 'Yes, Nice Touch supports custom keyboard shortcuts for all major actions.' },
        { question: 'Will it work with nested sequences?', answer: 'Yes, Nice Touch understands nested sequences and tracks changes across them.' },
        { question: 'Can it handle multicam?', answer: 'Yes, with some limitations. Nice Touch can suggest changes to multicam clips but angle switching requires manual review.' },
        { question: 'Does it support After Effects dynamic link?', answer: 'Nice Touch does not modify After Effects compositions but can flag them for review.' },
        { question: 'What about proxies?', answer: 'Nice Touch works with both proxies and high-res media.' },
        { question: 'Can it read Premiere markers?', answer: 'Yes, existing markers are used as context for AI suggestions.' },
        { question: 'Will it overwrite my work?', answer: 'No, all changes are suggested first. You choose what to apply.' },
      ],
      related: [
        { title: 'Integrations', url: '/integrations', description: 'See all supported editors' },
        { title: 'Timecoded feedback workflow', url: '/workflows/timecoded-feedback' },
        { title: 'Rough cut from transcript', url: '/workflows/rough-cut-from-transcript' },
      ],
    },

    resolve: {
      hero: {
        h1: 'AI assistant for DaVinci Resolve',
        description: 'Nice Touch integrates directly into DaVinci Resolve to help you apply feedback, speed up rough cuts, and reduce delivery errors.',
        videoUrl: 'https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0',
        videoTitle: 'Nice Touch for DaVinci Resolve Demo',
        videoTranscript: 'This demo shows how Nice Touch works inside DaVinci Resolve. See how review notes are converted into timeline markers, rough cuts are assembled from transcript, and export checks catch issues before delivery.',
      },
      whatYouCanDo: {
        heading: 'What you can do in Resolve',
        items: [
          'Convert timecoded notes into timeline markers and actions',
          'Build rough cuts faster using transcript analysis',
          'Catch export and delivery issues before final render',
        ],
      },
      exampleWorkflow: {
        heading: 'Example workflow',
        steps: [
          'Open your DaVinci Resolve project',
          'Launch the Nice Touch panel from the Edit or Fusion page',
          'Upload feedback or transcript',
          'Review suggested edits mapped to your timeline',
          'Apply changes and run pre-delivery QC checks',
        ],
      },
      compatibility: {
        heading: 'Compatibility',
        requirements: ['DaVinci Resolve 18.5 or later (Studio or free)', 'macOS 11+ or Windows 10+', 'Internet connection for AI processing'],
        limitations: ['Fusion compositions supported with context awareness', 'Some Color page metadata may not be accessible'],
      },
      faq: [
        { question: 'Does it work with Resolve Free?', answer: 'Yes, Nice Touch works with both DaVinci Resolve Studio and the free version.' },
        { question: 'Can it access the Color page?', answer: 'Nice Touch works primarily on the Edit page. Color metadata is visible but not editable.' },
        { question: 'Will it work with Fusion comps?', answer: 'Yes, Nice Touch can see Fusion compositions and provide context-aware suggestions.' },
        { question: 'Does it support compound clips?', answer: 'Yes, compound clips are fully supported.' },
        { question: 'Can it read Resolve markers?', answer: 'Yes, existing markers are used as context for suggestions.' },
        { question: 'What about optimized media?', answer: 'Nice Touch works with both original and optimized media.' },
        { question: 'Will it modify my grading?', answer: 'No, Nice Touch does not change color decisions or Fusion compositions.' },
        { question: 'Can it handle multi-user collaboration?', answer: 'Nice Touch works in single-user mode. Multi-user collaboration features are planned for future updates.' },
      ],
      related: [
        { title: 'Integrations', url: '/integrations', description: 'See all supported editors' },
        { title: 'Timecoded feedback workflow', url: '/workflows/timecoded-feedback' },
        { title: 'Export QC checks', url: '/workflows/export-qc-checks' },
      ],
    },
  },

  workflows: {
    hero: {
      h1: 'Workflows',
      description: 'Nice Touch workflows solve common editing bottlenecks with AI-powered assistance.',
    },
    cards: [
      {
        title: 'Timecoded feedback',
        targetAudience: 'Editors, Teams',
        outcome: 'Turn review notes into actionable edits faster.',
        features: [
          'Parse notes from any format',
          'Map feedback to timeline',
          'Track completion status',
        ],
        url: '/workflows/timecoded-feedback',
      },
      {
        title: 'Rough cut from transcript',
        targetAudience: 'Editors, Story Producers',
        outcome: 'Build story-driven rough cuts using transcript analysis.',
        features: [
          'Identify key moments',
          'Suggest B-roll placement',
          'Optimize pacing',
        ],
        url: '/workflows/rough-cut-from-transcript',
      },
      {
        title: 'Export QC checks',
        targetAudience: 'Editors, Post Supervisors',
        outcome: 'Catch delivery mistakes before they ship.',
        features: [
          'Audio level validation',
          'Format compliance checks',
          'Delivery spec verification',
        ],
        url: '/workflows/export-qc-checks',
      },
    ],
    mapping: {
      heading: 'How workflows map to Nice Touch',
      description: 'Each workflow is powered by the same core platform. Learn more about the product and integrations.',
      links: [
        { text: 'Product overview', url: '/product' },
        { text: 'Adobe Premiere Pro integration', url: '/integrations/adobe-premiere-pro' },
        { text: 'DaVinci Resolve integration', url: '/integrations/davinci-resolve' },
      ],
    },
  },

  workflowsDetail: {
    timecodedFeedback: {
      hero: {
        h1: 'Timecoded feedback for editors and teams',
        description: 'Turn review notes into actionable edits without manually hunting for timecodes.',
        videoUrl: 'https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0',
        videoTitle: 'Timecoded Feedback Workflow Demo',
        videoTranscript: 'Watch how Nice Touch parses timecoded feedback from emails, PDFs, or comments, then maps each note to your timeline as an actionable task. See how editors can jump between notes, mark items as complete, and ship revisions faster.',
      },
      problem: {
        heading: 'The problem',
        description: 'Review feedback comes in messy formats. Timecodes are inconsistent. Notes are scattered across emails, PDFs, and comment threads. Parsing and applying feedback manually eats hours out of every revision cycle.',
      },
      howItWorks: {
        heading: 'How Nice Touch handles it',
        steps: [
          'Upload feedback in any format (email, PDF, spreadsheet, plain text)',
          'Nice Touch parses timecodes and maps notes to your timeline',
          'Review the punch list with context-aware previews',
          'Jump to each note, make changes, and mark as complete',
          'Export a summary for stakeholders showing what was addressed',
        ],
        inputsOutputs: {
          heading: 'Example',
          input: 'Email with timecoded notes like "01:23 - tighten this section" and "02:45 - audio too loud"',
          output: 'Timeline markers at 01:23 and 02:45 with actionable tasks and completion tracking',
        },
      },
      bestFit: {
        heading: 'Best fit',
        whoFor: 'Editors working with client feedback, teams managing multiple stakeholder reviews, post supervisors tracking revision requests.',
        whenNot: 'If your feedback is already structured in a timeline tool, this workflow may be redundant.',
      },
      faq: [
        { question: 'What formats can I upload?', answer: 'Plain text, email, PDF, Word docs, Excel sheets, and more.' },
        { question: 'What if timecodes are wrong?', answer: 'Nice Touch flags uncertain timecodes for manual review.' },
        { question: 'Can I batch process multiple notes?', answer: 'Yes, you can apply changes to multiple notes at once.' },
        { question: 'Does it handle notes without timecodes?', answer: 'Yes, Nice Touch can suggest likely locations based on context.' },
        { question: 'Can I share the punch list?', answer: 'Yes, export as PDF or share a link with your team.' },
        { question: 'Will it overwrite my edits?', answer: 'No, all changes are previewed before you apply them.' },
        { question: 'Can it parse notes in other languages?', answer: 'English is fully supported. Other languages are experimental.' },
        { question: 'What if I disagree with a note?', answer: 'You can skip, defer, or add a comment explaining why.' },
      ],
      related: [
        { title: 'Workflows', url: '/workflows', description: 'See all workflows' },
        { title: 'Adobe Premiere Pro', url: '/integrations/adobe-premiere-pro' },
        { title: 'DaVinci Resolve', url: '/integrations/davinci-resolve' },
      ],
    },

    roughCut: {
      hero: {
        h1: 'Rough cuts from transcript',
        description: 'Speed up story edits by working from transcript. Build rough cuts faster and iterate with confidence.',
        videoUrl: 'https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0',
        videoTitle: 'Rough Cut Workflow Demo',
        videoTranscript: 'This demo shows how Nice Touch uses transcript analysis to identify key story beats, suggest B-roll placement, and help editors build rough cuts faster.',
      },
      problem: {
        heading: 'The problem',
        description: 'Building rough cuts from interviews or voiceover is slow. Finding the right soundbites takes time. Pacing decisions are subjective. Iterating on story structure means starting over.',
      },
      howItWorks: {
        heading: 'How Nice Touch handles it',
        steps: [
          'Upload transcript or let Nice Touch generate one from your media',
          'AI highlights key moments and story beats',
          'Review suggestions for rough cut structure',
          'Drag suggested clips to timeline or let Nice Touch assemble automatically',
          'Refine pacing, add B-roll, and iterate',
        ],
        inputsOutputs: {
          heading: 'Example',
          input: 'Interview transcript with 45 minutes of footage',
          output: '5-minute rough cut with key soundbites, suggested B-roll, and story flow',
        },
      },
      bestFit: {
        heading: 'Best fit',
        whoFor: 'Documentary editors, branded content producers, teams working with interview-heavy projects.',
        whenNot: 'If your project is heavily visual or abstract, transcript-based workflows may be less useful.',
      },
      faq: [
        { question: 'Can it generate transcripts?', answer: 'Yes, Nice Touch can transcribe your media automatically.' },
        { question: 'What if the transcript is wrong?', answer: 'You can edit the transcript before building the rough cut.' },
        { question: 'Does it suggest B-roll?', answer: 'Yes, based on visual and thematic analysis of your media pool.' },
        { question: 'Can I change the story structure?', answer: 'Yes, all suggestions are starting points. You have full control.' },
        { question: 'Will it work with multi-speaker interviews?', answer: 'Yes, Nice Touch identifies speakers and tracks who says what.' },
        { question: 'Can it handle voiceover?', answer: 'Yes, voiceover and narration are fully supported.' },
        { question: 'What languages are supported?', answer: 'English is fully supported. Other languages are experimental.' },
        { question: 'Does it replace the editor?', answer: 'No, Nice Touch assists with structure and pacing. Creative decisions are yours.' },
      ],
      related: [
        { title: 'Workflows', url: '/workflows', description: 'See all workflows' },
        { title: 'Adobe Premiere Pro', url: '/integrations/adobe-premiere-pro' },
        { title: 'Timecoded feedback', url: '/workflows/timecoded-feedback' },
      ],
    },

    exportQC: {
      hero: {
        h1: 'Export QC checks before delivery',
        description: 'Reduce delivery mistakes with practical QC checks that fit into your workflow. Ship with confidence.',
        videoUrl: 'https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0',
        videoTitle: 'Export QC Workflow Demo',
        videoTranscript: 'See how Nice Touch runs pre-delivery QC checks to catch audio level issues, format compliance problems, and other common mistakes before you export.',
      },
      problem: {
        heading: 'The problem',
        description: 'Delivery mistakes are costly. Audio too loud, wrong frame rate, missing slates, incorrect format specs. Manual QC is tedious and easy to skip when deadlines are tight.',
      },
      howItWorks: {
        heading: 'How Nice Touch handles it',
        steps: [
          'Run QC checks before export (or on an existing file)',
          'Nice Touch validates audio levels, format specs, and common delivery requirements',
          'Review flagged issues with context and suggestions',
          'Fix issues and re-run QC until clean',
          'Export with confidence or generate a QC report for stakeholders',
        ],
        inputsOutputs: {
          heading: 'Example',
          input: 'Timeline ready for export with delivery specs uploaded',
          output: 'QC report flagging "Audio peak at 02:15 exceeds -3dB" and "Frame rate is 23.976, spec requires 24"',
        },
      },
      bestFit: {
        heading: 'Best fit',
        whoFor: 'Post supervisors, editors delivering to broadcast or streaming platforms, teams with strict delivery requirements.',
        whenNot: 'If you are delivering internally or have no formal specs, this may be overkill.',
      },
      faq: [
        { question: 'What checks does it run?', answer: 'Audio levels, frame rate, resolution, format compliance, missing elements, and more.' },
        { question: 'Can I customize the checks?', answer: 'Yes, you can upload custom delivery specs or choose from presets.' },
        { question: 'Does it check color space?', answer: 'Basic color space validation is supported. Full color QC is not yet available.' },
        { question: 'Will it work with existing files?', answer: 'Yes, you can run QC checks on already-exported files.' },
        { question: 'Can it check for closed captions?', answer: 'Yes, Nice Touch can validate caption files and flag formatting issues.' },
        { question: 'Does it replace professional QC?', answer: 'No, Nice Touch catches common mistakes but does not replace full QC workflows.' },
        { question: 'Can I export a report?', answer: 'Yes, export PDF or CSV reports for your team or clients.' },
        { question: 'What if a check fails?', answer: 'Nice Touch provides context and suggestions for fixing the issue.' },
      ],
      related: [
        { title: 'Workflows', url: '/workflows', description: 'See all workflows' },
        { title: 'DaVinci Resolve', url: '/integrations/davinci-resolve' },
        { title: 'Adobe Premiere Pro', url: '/integrations/adobe-premiere-pro' },
      ],
    },
  },

  pricing: {
    hero: {
      h1: 'Pricing',
      description: 'Choose the plan that fits your workflow.',
    },
    plans: [
      {
        name: 'Early Access',
        whoFor: 'Individual editors',
        features: [
          'Access to all workflows',
          'Premiere Pro and Resolve support',
          'Email support',
          'Early access pricing',
        ],
        cta: 'Join Early Access',
      },
      {
        name: 'Team',
        whoFor: 'Small to mid-size teams',
        features: [
          'Everything in Early Access',
          'Team collaboration features',
          'Priority support',
          'Custom integrations',
        ],
        cta: 'Join Early Access',
      },
      {
        name: 'Enterprise',
        whoFor: 'Large organizations',
        features: [
          'Everything in Team',
          'Dedicated support',
          'Custom deployment',
          'SLA and security review',
        ],
        cta: 'Contact us',
      },
    ],
    faq: [
      { question: 'Is there a free trial?', answer: 'Join our Early Access program to try Nice Touch before general availability.' },
      { question: 'What payment methods do you accept?', answer: 'Credit card and invoicing for annual plans.' },
      { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time.' },
      { question: 'Do you offer educational discounts?', answer: 'Yes, contact us for details on educational and non-profit pricing.' },
      { question: 'What happens to my data if I cancel?', answer: 'Your data is deleted after 30 days. You can export before canceling.' },
    ],
  },

  about: {
    hero: {
      h1: 'About Nice Touch',
      description: 'We are building AI tools for professional video editors and post-production teams.',
    },
    why: {
      heading: 'Why we built it',
      content: 'Nice Touch was born from years of working in post-production and seeing the same bottlenecks slow down every project. Review cycles take too long. Rough cuts are tedious. Delivery mistakes are costly. We built Nice Touch to solve these problems with AI that actually understands editing workflows.',
    },
    whoFor: {
      heading: 'Who it is for',
      content: 'Nice Touch is for professional editors, post supervisors, and video teams who need to ship faster without sacrificing quality. If you have ever wished for an assistant who could parse feedback, suggest edits, and catch mistakes before delivery, Nice Touch is for you.',
    },
    team: {
      heading: 'The team',
      content: 'We are a small team of engineers and editors who care deeply about the craft. More details coming soon.',
    },
    links: [
      { text: 'Security and data', url: '/security' },
      { text: 'Contact us', url: '/contact' },
    ],
  },

  contact: {
    hero: {
      h1: 'Contact',
      description: 'Get in touch with the Nice Touch team.',
    },
    email: 'cooksey@nicetouch.app',
    expectations: 'We typically respond within 24 hours during business days.',
    securityNote: 'For security-related questions, please visit our security page.',
  },

  security: {
    hero: {
      h1: 'Security and data',
      description: 'How Nice Touch handles your data and keeps your projects secure.',
    },
    whatWeAccess: {
      heading: 'What we access',
      content: 'Nice Touch accesses timeline metadata, markers, and media references. Your source files stay local on your machine. We do not upload video files unless you explicitly choose to transcribe or analyze them.',
    },
    whatWeStore: {
      heading: 'What we store',
      content: 'We store project metadata, feedback notes, and AI-generated suggestions. All data is encrypted in transit and at rest. You can delete your data at any time from your account settings.',
    },
    whereProcessing: {
      heading: 'Where processing happens',
      content: 'AI processing happens on secure cloud infrastructure. Your data is processed in data centers that comply with SOC 2 and ISO 27001 standards.',
    },
    accessControl: {
      heading: 'Access control',
      content: 'Access to user data is strictly limited to authorized personnel for support and troubleshooting. All access is logged and audited.',
    },
    contactPath: 'For security questions or to report a vulnerability, contact us at cooksey@nicetouch.app.',
  },

  privacy: {
    hero: {
      h1: 'Privacy Policy',
      description: 'Last updated: [Date]',
    },
    content: 'Privacy policy content will be provided by legal team. This is placeholder text.',
  },

  terms: {
    hero: {
      h1: 'Terms of Service',
      description: 'Last updated: [Date]',
    },
    content: 'Terms of service content will be provided by legal team. This is placeholder text.',
  },
}



