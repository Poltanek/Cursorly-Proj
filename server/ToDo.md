# ToDo Backend
Goal:
- Limit File Size,
- Check MiME type,
- Validate file extension,
- Inspect file signature,
- Store in temporary directory,
- More to Permanent storage after validation

Tasks:
- Make Controllers, Routes, Middleware, Services, Models and Utils.

### Sub Task
# For processing .ani files (Preview Rendering System)

Accept file, send to preview service (containerised if possible)
extract static frame or safe representation
save as preview as png
store preview path in database