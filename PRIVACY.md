# Privacy

The static host has no telemetry, ads, mandatory account, external runtime dependency or cloud calls. Preferences/favorites stay in namespaced browser storage. Error logs are bounded and persist only when enabled. Export is user-initiated. Browser timestamps are not trusted evidence.

Optional HYPENET stores independent email/password hashes, sessions, profile, relationships, text messages, reports, lobbies and original-app saves. It does not request PSN credentials or console identifiers. Local test mail contains sensitive verification tokens and is excluded from source/artifacts. API logging is disabled; no chat/save bodies are logged.

Account deletion removes owned sessions/profile/relationships/saves and replaces sent messages with `[deleted]`, retaining anonymized conversation records. Abuse reports may retain their text with reporter/target references nullified. Production retention periods, moderation policy, backup expiry and data export require owner/operator approval before a public service. Local development data remains until its operator removes it; no remote deletion guarantee is made for backups.
