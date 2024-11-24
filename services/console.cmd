docker run -d --name minio-server \
  -p 9000:9000 \
  -p 9001:9001 \
  -v /path/to/data:/data \
  -e "MINIO_ROOT_USER=root" \
  -e "MINIO_ROOT_PASSWORD=password" \
  minio/minio server /data --console-address ":9001"