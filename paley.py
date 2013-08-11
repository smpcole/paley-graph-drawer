import turtle
import math
import sys

class Paley:

    def __init__(self, p, radius = 290):
        self.p = p
        self.radius = radius

    """Return coordinates of ith vertex"""
    def getVertex(self, i):
        angle = i * 2 * math.pi / self.p
        return (self.radius * math.cos(angle), self.radius * math.sin(angle))

    """Draw the Paley graph"""
    def draw(self):
        t = turtle.Turtle()
        t.speed(0)
        t.ht()
        visited = [[False for j in xrange(self.p)] for i in xrange(self.p)]
        for i in xrange(self.p):
            t.pu()
            t.goto(self.getVertex(i))
            for residue in xrange(1, (self.p - 1) / 2):
                j = (i + residue * residue) % self.p
                if not visited[i][j]:
                    t.pd()
                    t.goto(self.getVertex(j))
                    t.pu()
                    t.goto(self.getVertex(i))
                    visited[i][j] = visited[j][i] = True
        turtle.done()

def main(): 
    if len(sys.argv) > 1:
        pal = Paley(int(sys.argv[1]))
        if len(sys.argv) > 2:
            pal.radius = int(sys.argv[2])
        pal.draw()
    else:
        print "Please specify size of Paley graph"

if __name__ == "__main__":
    main()
