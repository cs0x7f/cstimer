# TODO: base image and build steps for this project.
FROM alpine:3
WORKDIR /app
COPY . .
# Security checklist 1.7: never run as root. uid 1000 matches the owner's user
# on UMDS so the bind-mounted /data stays writable.
RUN adduser -D -u 1000 app && mkdir -p /data && chown app:app /data
USER app
EXPOSE 8080
CMD ["sh", "-c", "echo 'replace me' && sleep infinity"]
