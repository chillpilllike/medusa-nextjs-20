# Use Paketo Node.js Buildpack base image
FROM paketobuildpacks/builder:base

# Set Node.js version
ENV BP_NODE_VERSION=20.*

# Copy application files
WORKDIR /workspace
COPY . .

# Use the Paketo lifecycle to build the image
RUN /cnb/lifecycle/detector && \
    /cnb/lifecycle/analyzer && \
    /cnb/lifecycle/builder && \
    /cnb/lifecycle/exporter

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
