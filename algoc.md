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



### 원형 큐

```
// C or C++ program for insertion and 
// deletion in Circular Queue 
#include<bits/stdc++.h> 
using namespace std; 

struct Queue 
{ 
	// Initialize front and rear 
	int rear, front; 

	// Circular Queue 
	int size; 
	int *arr; 

	Queue(int s) 
	{ 
	front = rear = -1; 
	size = s; 
	arr = new int[s]; 
	} 

	void enQueue(int value); 
	int deQueue(); 
	void displayQueue(); 
}; 


/* Function to create Circular queue */
void Queue::enQueue(int value) 
{ 
	if ((front == 0 && rear == size-1) || 
			(rear == (front-1)%(size-1))) 
	{ 
		printf("\nQueue is Full"); 
		return; 
	} 

	else if (front == -1) /* Insert First Element */
	{ 
		front = rear = 0; 
		arr[rear] = value; 
	} 

	else if (rear == size-1 && front != 0) 
	{ 
		rear = 0; 
		arr[rear] = value; 
	} 

	else
	{ 
		rear++; 
		arr[rear] = value; 
	} 
} 

// Function to delete element from Circular Queue 
int Queue::deQueue() 
{ 
	if (front == -1) 
	{ 
		printf("\nQueue is Empty"); 
		return INT_MIN; 
	} 

	int data = arr[front]; 
	arr[front] = -1; 
	if (front == rear) 
	{ 
		front = -1; 
		rear = -1; 
	} 
	else if (front == size-1) 
		front = 0; 
	else
		front++; 

	return data; 
} 

// Function displaying the elements 
// of Circular Queue 
void Queue::displayQueue() 
{ 
	if (front == -1) 
	{ 
		printf("\nQueue is Empty"); 
		return; 
	} 
	printf("\nElements in Circular Queue are: "); 
	if (rear >= front) 
	{ 
		for (int i = front; i <= rear; i++) 
			printf("%d ",arr[i]); 
	} 
	else
	{ 
		for (int i = front; i < size; i++) 
			printf("%d ", arr[i]); 

		for (int i = 0; i <= rear; i++) 
			printf("%d ", arr[i]); 
	} 
} 

/* Driver of the program */
int main() 
{ 
	Queue q(5); 

	// Inserting elements in Circular Queue 
	q.enQueue(14); 
	q.enQueue(22); 
	q.enQueue(13); 
	q.enQueue(-6); 

	// Display elements present in Circular Queue 
	q.displayQueue(); 

	// Deleting elements from Circular Queue 
	printf("\nDeleted value = %d", q.deQueue()); 
	printf("\nDeleted value = %d", q.deQueue()); 

	q.displayQueue(); 

	q.enQueue(9); 
	q.enQueue(20); 
	q.enQueue(5); 

	q.displayQueue(); 

	q.enQueue(20); 
	return 0; 
} 
```