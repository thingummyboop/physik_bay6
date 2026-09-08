"""Dimensionless circular motion of an electron in B = (0, 0, -1).

The phase increases clockwise. Position, tangent and force are kept separate
so the animation and numerical checks use the same explicit physical model.
"""
from math import sin, cos, pi


def electron_state(progress):
    theta = progress * pi / 2
    position = (-3 + 2.5 * sin(theta), -1 + 2.5 * cos(theta), 0)
    velocity = (cos(theta), -sin(theta), 0)
    force = (-sin(theta), -cos(theta), 0)
    return position, velocity, force
