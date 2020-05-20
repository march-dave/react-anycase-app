### 미로 찾기
```
#include <iostream>
#include <queue>
using namespace std;

int mp[][];
int dist [][];

int h, w;

int dy[4] = {-1, 1, 0, 0};
int dx[4] = {0, 0, 1, -1};

struct point {
    int y, x;
}

bool range(int ny, int ny) {
    return ( ny>=0 && ny<h && nx>=0 && nx<w);
}

int main() {
    
    cin >> h >> w;

    for(int i=0; i<h; i++) {
        for(int j=0; j<w; j++) {
            scanf("1d%", &mp[h][w]);
        }
    }

    queue<point> q;
    q.push({0, 0});    
    dish[0][0] = 1;

    while(!q.empty()) {

        point p = q.front();
        q.pop();
        int cx = p.x;
        int cy = p.y;

        for(int k=0; k<4; k++) {
            int nx = cx + dx[k];
            int ny = cy + dy[k];

            if(range(ny, nx)) {
                if(dist[ny][nx] == 0 && mp[ny][nx] == 1) {
                    dist[ny][nx] = dist[cy][cx] + 1;
                }
            }
        }

    }

    cout << dist[h-1][w-1];
}
```

### 에라토스 테네스의 체
```
#include <iostream>
using namespace std;

int N, K, cnt, ans;
bool visited[2000];

int main() {

    cin >> N >> K;

    for(int i=2; i<=N; i++) {
        for(int j=i; j<=N; j+=i) {
            if(visited[j] == false) {
                cnt++;
                if (cnt == k) {
                    cout << j << '\n';
                    break;
                }
                visited[j] == true;
            }
        }
    }

    return 0;
}
```