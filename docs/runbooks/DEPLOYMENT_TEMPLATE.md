# DEPLOYMENT — <hosting provider> (owner runbook)

- Last updated: <YYYY-MM-DD> · Applies to: <first release this runbook covers>

For: <owner>. One-time hosting setup, the deploy itself, and rollback. The release flow (preview, cutting a release, smoke test) is in `docs/runbooks/RELEASE.md`. Write every step in the style of `docs/process/RUNBOOK_STYLE.md`.

## 0. Values to have ready

Gather these first; every later step uses them.

| Value | Example | Where it comes from |
|---|---|---|
| Hosting account owner | | Discovery (who owns hosting, domain, email) |
| Server host name | `<server>.<provider>.com` | The hosting control panel's server info. **Use the server's full host name**, not a suggested alias such as `ftp.<domain>`: the alias may have no DNS record |
| Upload user | | Created in step 1 |
| Target directory | `/public_html` or `/` | The account's document root |
| Domain | | |

## 1. One-time setup

1. <Create the deploy user / FTP or SSH account with access to the document root only.> Expected: you can log in with it and see only the document root.
2. <HTTPS: certificate active; HTTP redirects to HTTPS on every hostname.> Expected: `http://` and `http://www.` both end on `https://` with a padlock.
3. Store credentials in GitHub: Settings → Secrets and variables → Actions. Expected: each name below appears in the right list (Secrets or Variables).

   | Kind | Put it in | Examples |
   |---|---|---|
   | Sensitive (passwords, keys, tokens) | **Secrets** | `<HOST>_PASSWORD`, API keys |
   | Not sensitive (host names, paths, public URLs, flags) | **Variables** | `<HOST>_SERVER`, `<HOST>_TARGET_DIR`, public build values (e.g. `PUBLIC_*`, `VITE_*`, `NEXT_PUBLIC_*`) |

   Keep non-sensitive values out of secrets: GitHub masks every occurrence of a secret's value in the logs, so a secret such as a target directory of `/` hides every `/` in the deploy output.
4. Hosting extras: check a fresh-profile page load on the hosting (a private window, or a Playwright run) for scripts or cookies the host injects. Record what you find and disclose it in the privacy notice before launch. Expected: a written baseline of cookies and third-party domains.

## 2. Dry run before the first release

Run the deploy workflow in dry-run mode (or against a test directory) before the first real release. Check:
- the connection works with the values from step 0;
- the file list it would upload and delete is what you expect (especially anything it would remove, such as a holding page);
- nothing secret appears in the logs.

Expected: the dry run is green and its file list matches what you expect.

## 3. Deploy

Normally automatic: publishing a release runs the deploy workflow for that tag (`RELEASE.md` section 3). By hand, only if the workflow is unavailable: <steps>.

## 4. Rollback

1. Re-run the deploy for the previous release tag (Actions → <deploy workflow> → Run workflow → the previous tag, e.g. `v1.2.3`), or re-publish it. Expected: the run is green and the site shows the previous version.
2. Run the smoke test (`RELEASE.md` section 4).
3. Fix forward on `main` and release again.

## 5. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Connection fails: host not found | A suggested alias (e.g. `ftp.<domain>`) has no DNS record | Use the server's full host name from the control panel |
| Login fails | Wrong user format (some hosts need `user@domain`) or password | Recreate the deploy user's password and update the secret |
| Logs show `***` everywhere | A non-sensitive value stored as a secret | Move it to a variable |
| Site shows old files | Cached by the host or CDN, or uploaded to the wrong directory | Check the target directory; purge the cache |
| Unexpected cookie or script in production | Injected by the host | Disclose it (privacy notice) or turn it off in the host's settings; record it in the hosting ADR |
