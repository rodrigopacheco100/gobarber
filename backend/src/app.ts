import server from '@shared/infra/http/server';

server.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
