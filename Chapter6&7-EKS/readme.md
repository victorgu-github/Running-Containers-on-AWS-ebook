# install eksctl 
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin

eksctl version    
0.138.0 # result 

# create cluster
eksctl create cluster -f cluster.yaml --dry-run

aws eks update-kubeconfig --name aws-containers-eks --region us-west-2

# kubectl install
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client

# install addon 
eksctl create cluster -f addon-config.yaml --dry-run